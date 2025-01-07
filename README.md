# Flomo Speech Assistant

一个基于语音识别的笔记助手，支持实时语音转文字并通过豆包 API 进行智能优化。

## 技术栈

### 前端
- React.js
- Tailwind CSS
- Web Speech API
- PWA 支持

### 后端
- Node.js
- Express.js
- 豆包 API 集成

## 功能特性

1. 语音转文字
   - 实时语音识别
   - 动态显示转写内容
   - 自动换行处理

2. AI 文本优化
   - 集成豆包 API
   - 支持多种优化模式（纠错、润色、总结）
   - 可配置的 API Key

## 项目结构

```
flomo-speech/
├── client/                 # 前端代码
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── hooks/        # 自定义 hooks
│   │   ├── services/     # API 服务
│   │   └── styles/       # Tailwind 样式
│   ├── public/           # 静态资源
│   └── package.json
├── server/                # 后端代码
│   ├── src/
│   │   ├── routes/       # API 路由
│   │   ├── services/     # 业务逻辑
│   │   └── config/       # 配置文件
│   └── package.json
└── README.md
```

## API 设计

### 后端 API 端点

1. POST `/api/optimize-text`
   - 功能：文本优化
   - 参数：
     - text: string (语音转写文本)
     - mode: string (优化模式：correct/polish/summarize)
   - 返回：优化后的文本

2. POST `/api/settings`
   - 功能：保存 API 设置
   - 参数：
     - arkApiKey: string (豆包 API Key)

## 开发步骤

1. 前端开发
   - 实现语音识别界面
   - 集成 Web Speech API
   - 实现文本编辑器
   - 添加设置页面
   - PWA 配置

2. 后端开发
   - 搭建 Express 服务器
   - 实现豆包 API 集成
   - 添加错误处理
   - 环境变量配置

3. 部署
   - 前端部署到 Vercel
   - 后端部署到云服务器

## 环境变量

```env
ARK_API_KEY=your_api_key
NODE_ENV=development/production
PORT=3000
```

## 开发指南

1. 克隆项目
```bash
git clone [repository-url]
```

2. 安装依赖
```bash
# 前端
cd client
npm install

# 后端
cd server
npm install
```

3. 运行开发环境
```bash
# 前端
npm run dev

# 后端
npm run dev
```
