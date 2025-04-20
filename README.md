# 瑞享社 - ReLife Club

## 演示视频
### 完整功能演示
<img src="docs/images/demo.gif" alt="完整功能演示" width="800" />

> 💡 如需观看更清晰的视频版本，请点击：[高清演示视频](docs/images/demo.mp4)

### AI助手使用演示
<img src="docs/images/ai-demo.gif" alt="AI助手使用演示" width="800" />

### 课程中心操作演示
<img src="docs/images/course-demo.gif" alt="课程中心操作演示" width="800" />

### 社区互动演示
<img src="docs/images/community-demo.gif" alt="社区互动演示" width="800" />

## 项目简介

随着中国人口老龄化的加速，50岁以上的中国人正逐步步入退休阶段。对于即将退休和刚刚退休的人群来说，退休不仅意味着职业生涯的结束，更是对几十年规律生活的彻底颠覆。瑞享社（ReLife Club）旨在通过人机共生的方式，设计并实施一个创新的解决方案，助力即将退休和刚刚退休的中国人适应新生活阶段。

我们创建一个以社群为核心的平台，结合AI智能体的技术支持，通过多样化的活动、课程设计和虚拟代币系统，帮助退休人群重建社交网络、学习新技能并找到生活的意义。

## 功能页面

### 1. 新鲜事
![新鲜事页面](docs/images/news-feed.png)
- 聚合各大平台热榜内容：
  - 微博热搜
  - 知乎热榜
  - 豆瓣电影
  - 虎扑热帖
  - B站排行榜
  - V2EX热门
  - IT之家资讯
  - 掘金文章
  - 贴吧热议
  - 网易新闻
  - 今日头条
  - 少数派文章
  - AcFun热门
- 实时更新，智能推荐感兴趣的内容
- 支持自定义热榜源和排序

### 2. AI助手
![AI助手页面](docs/images/ai-assistant.png)
- 智能对话：提供生活建议、心理咨询
- 活动规划：根据兴趣推荐合适的活动和课程
- 学习辅导：协助使用新技术、学习新技能
- 社交建议：提供社交互动建议和话题推荐
- 健康管理：饮食建议、运动计划制定

### 3. 课程中心
![课程中心页面](docs/images/course-center.png)
- 课程发布：
  - 用户可开设课程赚取代币
  - 支持多种课程类型（技能培训、经验分享等）
  - 整合腾讯会议进行在线授课
- 课程参与：
  - 使用代币报名参加课程
  - 实时互动和提问
  - 课后评价和反馈
- 课程分类：
  - 技能学习（摄影、绘画、编程等）
  - 兴趣培养（园艺、烹饪、手工等）
  - 经验分享（职业经验、生活智慧等）

### 4. 社区
![社区页面](docs/images/community.png)
- 兴趣社群：
  - 摄影爱好者
  - 运动健身
  - 读书交流
  - 旅行分享
  - 科技探讨
- 功能特点：
  - 群组聊天
  - 话题讨论
  - 资源分享
  - 线上线下活动组织
  - 社群管理与运营

### 5. 活动
![活动页面](docs/images/activities.png)
- 官方活动：
  - 线上互动活动
  - 线下见面会
  - 主题工作坊
  - 文化沙龙
- 用户自发活动：
  - 兴趣小组聚会
  - 技能交流会
  - 社区公益活动
- 活动管理：
  - 活动发布与报名
  - 签到打卡
  - 活动反馈
  - 精彩回顾

### 6. 钱包
![钱包页面](docs/images/wallet.png)
- 代币管理：
  - 代币余额查询
  - 收支明细
  - 代币获取记录
  - 消费记录
- 代币用途：
  - 课程报名
  - 活动参与
  - 社群特权
  - 虚拟商品兑换
- 交易功能：
  - 代币转账
  - 代币兑换
  - 交易记录查询

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