#!/bin/bash

# Server details
SERVER="117.72.76.110"
USER="root"

echo "Starting fix deployment process..."

# SSH into server and fix everything
ssh $USER@$SERVER << 'EOF'
  # 1. 配置 npm 使用淘宝镜像
  npm config set registry https://registry.npmmirror.com
  
  # 2. 安装 Node.js 20
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs

  # 3. 安装最新版 npm
  npm install -g npm@latest

  # 4. 安装 PM2
  npm install -g pm2

  # 5. 安装 Docker（使用阿里云镜像）
  curl -fsSL https://get.docker.com | sh -s docker --mirror Aliyun

  # 6. 安装 Docker Compose V2
  mkdir -p ~/.docker/cli-plugins/
  curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o ~/.docker/cli-plugins/docker-compose
  chmod +x ~/.docker/cli-plugins/docker-compose

  # 7. 配置 Docker 使用阿里云镜像
  mkdir -p /etc/docker
  cat > /etc/docker/daemon.json <<EOF2
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.baidubce.com"
  ]
}
EOF2

  # 8. 重启 Docker 服务
  systemctl daemon-reload
  systemctl restart docker
  systemctl enable docker

  # 9. 清理并重新部署 Daily Hot
  cd /root/daily-hot
  rm -rf *
  git clone https://github.com/eazylee/daily-hot.git .
  npm install
  pm2 delete daily-hot || true
  PORT=6688 pm2 start npm --name "daily-hot" -- start

  # 10. 确保主项目正常运行
  cd /root/relife-club
  npm install
  pm2 delete relife-club || true
  pm2 start npm --name "relife-club" -- start -- --port 3000

  # 11. 启动 VoceChat
  cd /root
  docker-compose -f docker-compose.vocechat.yml down
  docker-compose -f docker-compose.vocechat.yml up -d

  # 12. 保存 PM2 配置
  pm2 save

  # 13. 显示服务状态
  echo "Checking service status..."
  pm2 list
  docker ps

  echo "Fix completed!"
  echo "Main project should be running on port 3000"
  echo "Daily Hot should be running on port 6688"
  echo "VoceChat should be running on port 8080"
EOF

echo "Fix script completed!" 