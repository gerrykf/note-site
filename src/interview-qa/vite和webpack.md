# Vite 和 Webpack

- [Vite 和 Webpack](#vite-和-webpack)
  - [基础概念](#基础概念)
    - [1. Vite 和 Webpack 有什么区别？](#1-vite-和-webpack-有什么区别)
    - [2. Vite 为什么启动更快？](#2-vite-为什么启动更快)
    - [3. Vite 和 Webpack 在构建时的差异？](#3-vite-和-webpack-在构建时的差异)
  - [性能优化](#性能优化)
    - [1. 如何优化 Webpack 构建速度？](#1-如何优化-webpack-构建速度)
    - [2. 如何优化 Vite 构建速度？](#2-如何优化-vite-构建速度)
  - [进阶问题](#进阶问题)
    - [1. Vite 和 Webpack 分别适用于哪些场景？](#1-vite-和-webpack-分别适用于哪些场景)
    - [2. Vite/Webpack 是如何实现 HMR（热更新）的？](#2-vitewebpack-是如何实现-hmr热更新的)
    - [3. Webpack Tree Shaking 的原理是什么？](#3-webpack-tree-shaking-的原理是什么)
    - [4. 如何在 Vite 和 Webpack 中实现代码分割（Code Splitting）？](#4-如何在-vite-和-webpack-中实现代码分割code-splitting)
  - [其他问题](#其他问题)
    - [1. 如何在 Vite 和 Webpack 中进行跨域代理？](#1-如何在-vite-和-webpack-中进行跨域代理)
    - [2. Vite 和 Webpack 如何处理 CSS？](#2-vite-和-webpack-如何处理-css)
  - [总结](#总结)
    - [表格对比](#表格对比)
    - [Webpack 打包构建流程](#webpack-打包构建流程)
    - [Vite 打包构建流程](#vite-打包构建流程)

> Vite 和 Webpack 是前端构建工具，在面试中经常被问到，尤其是它们的区别、优缺点、工作原理以及优化方案。以下是一些常见的 Vite 和 Webpack 面试题：

## 基础概念

### 1. Vite 和 Webpack 有什么区别？

- Webpack 是基于 Bundle（打包） 的构建工具，而 Vite 采用 原生 ES 模块（ESM）+ 按需编译 进行开发。
- Vite 的冷启动速度比 Webpack 快，因其使用 esbuild 预构建依赖，而 Webpack 需要解析和打包整个项目。
- Webpack 需要配置HMR（热模块替换），Vite 原生支持 HMR，热更新更快。
- Webpack 可以支持复杂的模块联邦、微前端、SSR，Vite 对 SSR 和构建优化做了更轻量的处理。

### 2. Vite 为什么启动更快？

- 依赖预构建：Vite 使用 `esbuild` 预编译依赖，而 `esbuild` 是用 Go 语言编写，比 Webpack 用 JS 实现的 Babel 解析速度快 10-100 倍。
- 按需编译：Vite 在开发时不需要打包整个项目，而是采用 Native ESM，只在浏览器请求某个模块时进行**即时编译**。

### 3. Vite 和 Webpack 在构建时的差异？

- Webpack 在构建时采用 `Tree Shaking` 和 `Code Splitting` 进行优化，生成最终的 `Bundle`。
- Vite 在开发模式下不进行打包，但在生产模式仍然使用 `Rollup` 进行打包优化。

## 性能优化

### 1. 如何优化 Webpack 构建速度？

- 使用 `thread-loader`/`cache-loader` 进行并行编译和缓存编译结果。
- 使用 `babel-loader` 结合 `@babel/preset-env` 进行按需编译。
- 合理拆分代码（Code Splitting），减少初始包体积。
- 使用 `terser-webpack-plugin` 进行压缩，并开启 `parallel` 选项。
- 使用 `hard-source-webpack-plugin` 提高增量构建速度（Webpack 5 内置 `cache` ）。

### 2. 如何优化 Vite 构建速度？

- 优化依赖预构建，可以使用 `optimizeDeps.include` 配置。
- 使用 `build.rollupOptions.output.manualChunks` 进行代码拆分。
- 减少 `import` 体积，避免引入过大依赖（如 moment.js）。
- 使用 gzip 或 brotli 压缩，如 `vite-plugin-compression`。

## 进阶问题

### 1. Vite 和 Webpack 分别适用于哪些场景？

- Vite 适用于：
  - Vue 3 / React / Svelte / 小型项目，特别是开发体验要求高的场景。
  - 需要 SSR（服务端渲染） 的场景，如 Nuxt 3（基于 Vite）。
  - 现代前端项目，依赖 ESM 生态，如 `@vite/plugin-vue`。

- Webpack 适用于：
  - 复杂的大型项目，如微前端、企业级应用，或者需要细粒度控制打包的场景。
  - 兼容性要求高的项目，如需要支持 IE11（Vite 不支持）。
  - 需要自定义打包逻辑，如 Webpack `Module Federation`（模块联邦）。

### 2. Vite/Webpack 是如何实现 HMR（热更新）的？

- 监听文件变更 → 触发 HMR 事件 → 只重新加载受影响的模块，而不是整个应用。
- Vite 采用 WebSocket 进行 HMR 通信，Webpack 采用 `webpack-dev-server` 或 `webpack-hot-middleware` 进行 HMR。

### 3. Webpack Tree Shaking 的原理是什么？

- 基于 ES Module 的静态分析，删除未使用的代码（Dead Code Elimination）。
- 依赖 `TerserPlugin` 进行 DCE（Dead Code Elimination）。
- 需要 `sideEffects`: false，否则 Webpack 可能不会删除某些模块。

### 4. 如何在 Vite 和 Webpack 中实现代码分割（Code Splitting）？

- Webpack
  - `splitChunks` 进行静态拆分：

    ```js
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
        },
    }
    ```

  - `import()` 进行动态导入：

    ```js
    import('./module').then(module => {
    console.log(module);
    });
    ```

- Vite
  - 生产模式下 Rollup 进行代码拆分：

    ```js
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    }
    ```

## 其他问题

### 1. 如何在 Vite 和 Webpack 中进行跨域代理？

- Vite:

    ```js
    // vite.config.js
    server: {
        proxy: {
            '/api': {
            target: 'https://backend.com',// 服务端API地址
            changeOrigin: true,// 是否跨域
            rewrite: (path) => path.replace(/^\/api/, ''),// 重写路径
            },
        },
    }
    ```

- Webpack（`devServer.proxy`）:

    ```js
    // webpack.config.js
    devServer: {
        proxy: {
            '/api': {
            target: 'https://backend.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
            },
        },
    }
    ```

### 2. Vite 和 Webpack 如何处理 CSS？

- Vite 直接支持 `postcss`，可配置 `css.preprocessorOptions`：

    ```js
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/styles/variables.scss";',
            },
        },
    }
    ```

- Webpack 需要 `css-loader` 和 `style-loader`：

    ```js
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    }
    ```

## 总结

### 表格对比

|     | Vite  | Webpack  |
| --- | ---   | ---      |
| 启动速度 | 快（esbuild 预编译 + 按需加载）   | 慢（需要打包所有模块）      |
| 开发体验 | 更快的 HMR   | HMR 相对较慢      |
| 适用场景 | Vue 3、React、现代 Web  | 大型项目、微前端、IE11 兼容  |
| 优化方式 | `optimizeDeps`、按需加载  | `splitChunks`、缓存、并行编译）      |
| 跨域代理 | `server.proxy`  | `devServer.proxy`      |

### Webpack 打包构建流程

1. 给它一个入口文件
2. 它通过入口文件去找依赖(会找到很多的模块，这些模块包含 js 模块，css 模块，包含图片)
3. webpack 进行打包，通过 loader、plugin 等打包 生成打包文件
4. 启动一个开发服务器
5. 我们访问这个开发服务器 webpack 就会把这些打包结果响应给我们

### Vite 打包构建流程

1. 直接启动开发服务器(用 koa 启动的服务器)
2. 我们访问服务器地址，它把 index.html 文件内容响应给我们
3. `src="/src/main.js"` 页面上的入口文件会让浏览器自动发送请求
4. `main.js` 中包含什么模块，浏览器再请求这些文件内容

```html
<script type="module" src="/src/main.js"></script>
```

`type=module` 需要现代浏览器支持

- 总结
  webpack 耗时在先打包再启动开发服务器，vite 直接启动开发服务器 index.html 中会自动发出请求进行后续模块读取，所以不管项目大小、模块多少 vite 的启动速度都非常快，因为它没有打包过程，不需要分析模块的依赖、不需要编译
  HMR 方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不需要像 webpack 那样 需要把该模块的相关依赖模块全部编译一次
  当需要打包到生产环境时，vite 使用传统的 rollup 进行打包 所以**vite 的优势主要还是在开发阶段**
  注意点：Vite 使用的是 ES Module，因此在代码中不可以使用 CommonJS 语法

那为什么 vue2 使用 webpack 可以使用 CommonJS 的语法呢,例如：`require("./style.css")`:
因为 webpack 是先打包，打包完了就没有 require 等语法了，只剩下立即执行函数等 js 代码
vite 没有打包,直接用浏览器请求的方式 浏览器不认识 require 等 commonjs 语法
