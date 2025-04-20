#!/bin/bash

# 确保脚本在错误时停止
set -e

# 服务器信息
SERVER_IP="117.72.76.110"
SERVER_USER="root"

echo "开始部署项目到服务器..."

# 1. 首先将所需文件传输到服务器
echo "正在传输文件到服务器..."
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p /root/relife-club"
scp -r ./* ${SERVER_USER}@${SERVER_IP}:/root/relife-club/

# 2. 连接到服务器并执行部署
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
cd /root/relife-club

# 安装 Docker 和 Docker Compose（如果尚未安装）
if ! command -v docker &> /dev/null; then
    echo "正在安装 Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl start docker
    systemctl enable docker
fi

if ! command -v docker-compose &> /dev/null; then
    echo "正在安装 Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# 安装 Node.js（如果尚未安装）
if ! command -v node &> /dev/null; then
    echo "正在安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# 部署主项目（端口 3000）
echo "正在部署主项目..."
cd /root/relife-club
npm install
pm2 delete relife-main || true
pm2 start server.js --name relife-main

# 部署 Daily Hot（端口 6688）
echo "正在部署 Daily Hot..."
cd /root/relife-club/frontend
npm install
npm run build
pm2 delete daily-hot || true
pm2 serve build 6688 --name daily-hot

# 部署 VoceChat（端口 8080）
echo "正在部署 VoceChat..."
cd /root/relife-club
docker-compose -f docker-compose.vocechat.yml down || true
docker-compose -f docker-compose.vocechat.yml up -d

# 确保所有服务都在运行
echo "正在检查服务状态..."
pm2 list
docker ps

echo "部署完成！"
EOF 