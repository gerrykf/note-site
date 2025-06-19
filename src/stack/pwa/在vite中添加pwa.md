# 在 vue3+vite 中添加 pwa

在 Vue 3 + Vite 中添加 PWA（渐进式 Web 应用）可以通过使用 vite-plugin-pwa 插件来实现。这个插件帮助你将 PWA 配置集成到 Vite 项目中，并且提供了自动生成 manifest.json 文件、注册 Service Worker 等功能。

步骤：在 Vue 3 + Vite 中添加 PWA

## 1.安装必要的插件

```bash
pnpm install vite-plugin-pwa -D
```

## 2.配置 vite.config.js

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VitePWA from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate", // 自动更新
      includeAssets: ["favicon.ico", "robots.txt"], // 包括的静态资源
      manifest: {
        name: "My Vue 3 PWA", // 应用名称
        short_name: "Vue3PWA", // 应用短名称
        description: "A Progressive Web App built with Vue 3 and Vite", // 描述
        theme_color: "#42b883", // 主题颜色
        background_color: "#ffffff", // 背景颜色
        start_url: "/", // 启动 URL
        display: "standalone", // 全屏显示
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ] // 图标
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // 缓存的文件类型
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024 // 最大缓存文件大小 6MB
      }
    })
  ]
});
```

- `registerType: 'autoUpdate'`:配置 Service Worker 的注册方式，autoUpdate 表示自动更新。
- `manifest`:配置你的 `manifest.json` 文件，用于描述 PWA 应用的元数据（如应用名称、图标、主题颜色等）。
- `workbox`:配置 Workbox 的缓存策略，`globPatterns` 用来指定需要缓存的文件类型。

## Web App Manifest

保证项目中存在 manifest.json 文件

前端项目在安卓手机上打开浏览器 添加到主屏幕则会提醒 安装 Web App

也可以 动态创建

```ts
/**
 * 创建manifest.json
 *
 * @description
 * 1. 创建manifest.json文件
 * 2. 创建不同尺寸的favicon
 *
 * 所有尺寸：
 * favicon-16x16
 * favicon-32x32
 * android-chrome-192x192
 * android-chrome-512x512
 * apple-touch-icon-180x180
 */
const createManifest = () => {
  const fileNames = [
    "favicon-16x16",
    "favicon-32x32",
    "android-chrome-192x192",
    "android-chrome-512x512"
  ];
  const data = {
    name: "Your App Name",
    short_name: "App",
    description: "Your app description",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    start_url: "/",
    display: "standalone",
    icons: fileNames.map((fileName) => ({
      src: "图标路径",
      sizes: fileName.includes("android-chrome")
        ? fileName.replace("android-chrome-", "")
        : fileName.replace("favicon-", ""),
      sizes: fileName,
      type: "image/png"
    }))
  };

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const manifestLink = document.createElement("link");
  manifestLink.rel = "manifest";
  manifestLink.href = url;
  document.head.appendChild(manifestLink);

  const link = document.createElement("link");
  link.rel = "manifest";

  // favicon
  const sizes = ["16x16", "32x32"];
  sizes.forEach((size) => {
    appendLinkTag("icon", "图标路径", size);
  });

  // android-chrome
  const androidSizes = ["192x192", "512x512"];
  androidSizes.forEach((size) => {
    appendLinkTag("icon", "图标路径", size);
  });

  // apple-touch-icon
  appendLinkTag("apple-touch-icon", "图标路径", "180x180");
};
```
