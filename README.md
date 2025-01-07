# Flomo Speech

一个支持语音输入并同步到 Flomo 的渐进式 Web 应用（PWA）。

## 功能特点

- 实时语音转文字
- AI 文本优化（基于豆包 API）
- 同步到 Flomo
- 优雅的 UI 设计
- 支持深色模式
- PWA 支持

## 技术栈

- 前端：React + Vite + TailwindCSS
- 后端：Node.js + Express
- 部署：Vercel

## 本地开发

1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/flomo-speech.git
   cd flomo-speech
   ```

2. 安装依赖：
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. 创建环境变量文件：
   ```bash
   # 在 server 目录下创建 .env 文件
   PORT=3001
   NODE_ENV=development
   ```

4. 启动开发服务器：
   ```bash
   # 在根目录运行
   npm run dev
   ```

## 部署

本项目使用 Vercel 进行部署。只需要：

1. Fork 这个仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署！

## 配置

在使用之前，需要配置：

1. 豆包 API Key（用于 AI 文本优化）
2. Flomo API（用于同步笔记）

这些配置可以在应用的设置面板中完成。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License

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
