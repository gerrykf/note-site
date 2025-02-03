# 部署到 github pages

<https://github.com/ssthouse/ssthouse-blog/blob/master/use-github-page-efficiently/blog.md>

> .github/workflows/jekyll-gh-pages.yml

```yml

name: Build and Deploy Site

on:

# 当 push 到 main 分支时触发

push:
branches: ["main"]

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
steps: - name: Checkout Code
uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'   # 根据需要选择 Node.js 版本

      - name: Install Dependencies
        run: npm install

      - name: Build Project
        run: npm run docs:build
        # 此处假设你的构建命令会生成 dist 文件夹，
        # 且 dist/index.html 为入口页面

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

deploy:
runs-on: ubuntu-latest
needs: build
environment:
name: github-pages
url: ${{ steps.deployment.outputs.page_url }}
steps: - name: Deploy to GitHub Pages
id: deployment
uses: actions/deploy-pages@v4
```
