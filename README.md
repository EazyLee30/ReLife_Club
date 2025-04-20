# 瑞享社 - ReLife Club

## 项目简介

随着中国人口老龄化的加速，50岁以上的中国人正逐步步入退休阶段。对于即将退休和刚刚退休的人群来说，退休不仅意味着职业生涯的结束，更是对几十年规律生活的彻底颠覆。瑞享社（ReLife Club）旨在通过人机共生的方式，设计并实施一个创新的解决方案，助力即将退休和刚刚退休的中国人适应新生活阶段。

我们创建一个以社群为核心的平台，结合AI智能体的技术支持，通过多样化的活动、课程设计和虚拟代币系统，帮助退休人群重建社交网络、学习新技能并找到生活的意义。

## 核心功能

### 1. 社群平台
- 连接目标用户，提供归属感和支持网络
- 线上线下结合的社交活动
- 兴趣小组和主题讨论

### 2. AI智能体
- 活动策划和推荐
- 线下活动召集人
- 群聊氛围带动者
- 个性化咨询服务

### 3. 活动与课程
- 反差体验活动（如圣诞夜店蹦迪夜、摇滚音乐会）
- 技能学习课程（自媒体、DJ打碟、摄影等）
- 职业再就业课程（领导力、产品设计等）

### 4. 虚拟代币系统
- 参与活动赚取代币
- 开设课程分享经验
- 消费代币报名课程或活动
- 兑换社群特权

## 技术架构

项目采用现代化的技术栈，包括：

- 前端：React.js
- 后端：Node.js
- AI：Python
- 区块链：Sui
- 数据库：MongoDB

## 本地安装

1. **安装依赖**：
   - 后端：`cd backend && npm install`
   - 前端：`cd frontend && npm install`
   - AI：`cd ai && pip install requests numpy`
   - 区块链：安装 Sui CLI（参考 Sui 文档）

2. **启动后端**：
   - `cd backend && npm start`

3. **启动前端**：
   - `cd frontend && npm start`

4. **测试 AI**：
   - `cd ai && python ai_model.py`

5. **部署代币**：
   - 使用 Sui CLI 编译并部署 `retire_coin.move`

6. **访问**：打开浏览器，访问 `http://localhost:3000`

## 服务器部署步骤

1. **准备服务器**：
   - 安装 Node.js、npm、Python、MongoDB 和 Sui CLI 安装 Sui CLI。
2. **上传文件**：
   - 将 `relife-club` 文件夹上传至服务器。
3. **部署后端**：
   - `cd backend && npm install && npm start`
4. **部署前端**：
   - `cd frontend && npm install && npm run build`，用 Nginx 托管 `build` 文件夹。
5. **运行 AI**：
   - `cd ai && pip install requests numpy && python ai_model.py`
6. **部署代币**：
   - 使用 Sui CLI 编译并发布 `retire_coin.move`。

## 项目目标

- **心理健康**：减少用户失落感，提升幸福感
- **生理健康**：通过活动改善身体状况
- **社交网络**：帮助用户建立新的社交圈
- **生活意义**：协助用户找到新的兴趣和目标

## 贡献指南

欢迎贡献代码、提出建议或报告问题。请遵循以下步骤：

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。 