#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m'

# Server details
SERVER="117.72.76.110"
USER="root"

echo -e "${GREEN}Starting deployment process...${NC}"

# 1. Package the main project
echo -e "${GREEN}Packaging main project...${NC}"
tar czf relife-club.tar.gz frontend/ backend/ package.json package-lock.json

# 2. Copy files to server
echo -e "${GREEN}Copying files to server...${NC}"
scp relife-club.tar.gz $USER@$SERVER:/root/
scp docker-compose.yml $USER@$SERVER:/root/
scp docker-compose.vocechat.yml $USER@$SERVER:/root/

# 3. SSH into server and setup everything
ssh $USER@$SERVER << 'EOF'
  # Install necessary dependencies
  echo -e "${GREEN}Installing dependencies...${NC}"
  
  # Install Docker if not exists
  if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
  fi

  # Install Docker Compose if not exists
  if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
  fi

  # Install Node.js 20 if not exists or version is lower
  if ! command -v node &> /dev/null || [ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
  fi

  # Install PM2 if not exists
  if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
  fi

  # Create necessary directories
  mkdir -p /root/relife-club
  mkdir -p /root/daily-hot
  mkdir -p /root/vocechat

  # Extract main project
  cd /root
  tar xzf relife-club.tar.gz -C /root/relife-club

  # Setup main project (port 3000)
  cd /root/relife-club
  npm install
  pm2 delete relife-club || true
  pm2 start npm --name "relife-club" -- start -- --port 3000

  # Setup Daily Hot (port 6688)
  cd /root/daily-hot
  if [ ! -d ".git" ]; then
    git clone https://github.com/eazylee/daily-hot.git .
    npm install
  fi
  pm2 delete daily-hot || true
  PORT=6688 pm2 start npm --name "daily-hot" -- start

  # Setup VoceChat (port 8080)
  cd /root
  systemctl start docker
  systemctl enable docker
  docker-compose -f docker-compose.vocechat.yml down
  docker-compose -f docker-compose.vocechat.yml up -d

  # Save PM2 configuration
  pm2 save

  # Show running services
  echo "Checking service status..."
  pm2 list
  docker ps

  echo "Deployment completed!"
  echo "Main project running on port 3000"
  echo "Daily Hot running on port 6688"
  echo "VoceChat running on port 8080"
EOF

echo -e "${GREEN}Deployment completed successfully!${NC}" 