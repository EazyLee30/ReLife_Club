#!/bin/bash

# 创建数据目录
mkdir -p vocechat-data

# 启动 VoceChat
docker-compose -f docker-compose.vocechat.yml up -d

echo "VoceChat 已启动，请访问 http://localhost:8080"
echo "管理员邮箱: admin@localhost"
echo "管理员密码: admin123"
echo "请及时修改管理员密码" 