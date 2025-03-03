# 部署到 github pages

<https://github.com/ssthouse/ssthouse-blog/blob/master/use-github-page-efficiently/blog.md>

> .github/workflows/jekyll-gh-pages.yml

```yml

name: Build and Deploy Site

on:
  # 当 push 到 main 分支时触发
  push:
    branches: ["main"] # 监听 mian 分支提交
  # 允许手动触发工作流
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# 避免并发部署（排队期间的任务会被跳过，但不取消正在运行的任务）
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 📥 拉取代码
        uses: actions/checkout@v4

      - name: 🔧 设置 Node.js 环境
        uses: actions/setup-node@v3
        with:
          node-version: "18" # 根据需要选择 Node.js 版本

      - name: 📦 安装依赖
        run: npm install

      - name: 🚀 运行构建
        run: npm run docs:build
        # 此处假设你的构建命令会生成 dist 文件夹，
        # 且 dist/index.html 为入口页面

      - name: 📤 上传构建产物
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: 🚀 部署到 Github Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

配置项说明

- 触发条件：监听 `main` 分支 push 事件
- 安装依赖：使用 `npm install`
- 构建前端：`npm build:docs` 生成 `dist`
- 上传构建产物：存储在 GitHub Actions 的 `artifact`
- 远程部署：
  - 使用 `scp-action` 上传到服务器 `/var/www/html`
  - 需要配置 服务器 SSH Key
