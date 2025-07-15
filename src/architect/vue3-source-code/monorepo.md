# monorepo 项目搭建

## 项目搭建

搭建一个 vue3 的 monorepo 项目，使用 pnpm 作为包管理器。

1. 创建 vue3 monorepo 项目

```bash
mkdir vue3 && cd vue3
```

2. 安装 `pnpm`

如果你还没安装全局的 `pnpm`，可以使用以下命令安装：

```bash
npm install -g pnpm
```

安装完成后，可以使用以下命令检查是否安装成功：

```bash
pnpm -v # 打印出 pnpm 的版本号 就成功了
```

3. 初始化 pnpm 项目

```bash
pnpm init
```

这会创建一个 `package.json` 文件。

4. 配置 pnpm workspace

在 `vue3` 根目录下创建一个 `pnpm-workspace.yaml` 文件，内容如下：

```yaml
packages:
  - "packages/*" # 包含所有的 packages 目录下的子目录
```

5. 创建 `vue3` 子项目

在 `vue3` 根目录下创建一个 `packages` 目录，并在其中创建一个子项目 `reactivity` 作为响应式的子包，此时的目录结构如下：

```bash
vue3/
├── packages/
│   └── reactivity/
│   └── vue/
├── package.json
├── pnpm-workspace.yaml
```

6. 安装依赖

在 monorepo 中安装依赖和普通项目有所不同，由于每个子包都可以有自己的依赖，所以我们安装时需要指定安装到哪个子包中。
例如我们要安装 `typescript` :

非 monorepo 项目中，我们可以直接使用以下命令：

```bash
npm install typescript --save-dev
```

但是如果我们在 monorepo 项目中这样安装，会报错，错误如下：

```bash
 ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
```

这个错误信息告诉我们，如果你希望将依赖添加到项目根目录中，需要添加标记 -w 或者 --workspace-root
我们根据提示安装依赖：

```bash
pnpm install typescript --save-dev -w
```

安装成功，支持 monorepo 项目搭建完成

## 配置 typescript

`vue3/tsconfig.json`

```ts
{
  "compilerOptions": {
    "target": "ESNext", // 指定 ECMAScript 目标版本
    "module": "ESNext", // 指定模块代码生成规范
    "moduleResolution": "node", // 指定模块解析策略
    "outDir": "dist", // 指定编译输出的目录
    "resolveJsonModule": true, // 允许导入 JSON 文件
    "strict": false, // 关闭严格模式
    "lib": [
      "ESNext",
      "DOM"
    ], // 指定要使用的库文件
    "paths": {
      // 希望导入的包名映射到实际的路径
      // @vue/* 映射到 packages/*/src *-表示reactivity|shared等
      "@vue/*": [
        "packages/*/src"
      ]
    },
    "baseUrl": "./"
  }
}
```

## 配置 esbuild

`vue3/scripts/dev.js`

```js
/**
 * 打包开发环境的脚本
 *
 * node scripts/dev.js --format cjs
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import esbuild from "esbuild";
import { createRequire } from "node:module";

console.log(process.argv);

const {
  values: { format },
  positionals
} = parseArgs({
  allowPositionals: true,
  options: {
    format: {
      type: "string",
      short: "f",
      default: "esm"
    }
  }
});

console.log("format", format, positionals);

// 创建esm 的 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);
const target = positionals.length ? positionals[0] : "vue";

const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
console.log("entry", entry);

/**
 * --format cjs or esm
 * cjs ==> reactivity.cjs.js
 * esm ==> reactivity.esm.js
 * @type {string}
 */
const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
);

const pkg = require(`../packages/${target}/package.json`);
console.log("package", pkg);

esbuild
  .context({
    entryPoints: [entry], // 入口文件
    outfile, // 输出文件路径
    format, // 输出格式 (esm, cjs, iife)
    platform: format === "cjs" ? "node" : "browser", // 打包平台类型
    sourcemap: true, // 是否生成 sourcemap 文件
    bundle: true, // 把所有的依赖打包到一个文件中
    globalName: pkg.buildOptions.name // 全局变量名 (iife 模式下使用)
  })
  .then((ctx) => ctx.watch());
```

在 package.json 中添加脚本命令：

```json
{
  "scripts": {
    "dev": "node scripts/dev.js reactivity --format iife"
  }
}
```

````运行脚本命令：

```bash
pnpm dev
````

这将运行 `scripts/dev.js` 脚本，并将 `reactivity` 包打包为 IIFE 格式。

## 安装 monorepo 中的子包

前置条件：
我们在`vue3/packages/` 创建一个工具函数的子包和一个核心包，目录结构如下：

```bash
vue3/
├── packages/
│   ├── reactivity/ # 响应式模块
│   │     ├── dist/ # 打包后的代码目录
│   │     ├── src/ # 源代码目录
│   │     │   └── index.ts # 入口文件
│   │     └── package.json # 包的配置文件
│   │
│   ├── shared/ # 共享的工具函数包
│   │     ├── dist/ # 打包后的代码目录
│   │     ├── src/ # 源代码目录
│   │     │   └── index.ts # 入口文件
│   │     └── package.json # 包的配置文件
│   │
│   └── vue/ # vue3 的核心包
│         ├── dist/ # 打包后的代码目录
│         ├── src/ # 源代码目录
│         │   └── index.ts # 入口文件
│         └── package.json # 包的配置文件
├── package.json # 根目录的 package.json 文件
├── pnpm-workspace.yaml # pnpm workspace 配置文件
```

reactivity 包的 `package.json`

```json
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "description": "响应式模块",
  "main": "index.js",
  "module": "dist/reactivity.esm.js",
  "files": ["index.js", "dist"],
  "sideEffects": false,
  "buildOptions": {
    "name": "VueReactivity",
    "formats": ["esm-bundler", "esm-browser", "cjs", "global"]
  },
  "dependencies": {
    "@vue/shared": "workspace:*"
  }
}
```

shared 包的 `package.json`

```json
{
  "name": "@vue/shared",
  "version": "1.0.0",
  "description": "工具函数",
  "main": "dist/shared.cjs.js",
  "module": "dist/shared.esm.js",
  "files": ["index.js", "dist"],
  "sideEffects": false,
  "buildOptions": {
    "name": "VueShared",
    "formats": ["esm-bundler", "esm-browser", "cjs", "global"]
  }
}
```

vue 包的 `package.json`

```json
{
  "name": "vue",
  "version": "1.0.0",
  "description": "vue核心库",
  "main": "dist/vue.cjs.js",
  "module": "dist/vue.esm.js",
  "files": ["index.js", "dist"],
  "sideEffects": false,
  "buildOptions": {
    "name": "Vue",
    "formats": ["esm-bundler", "esm-browser", "cjs", "global"]
  }
}
```

在 monorepo 中安装子包时，可以使用以下命令：

我们将`@vue/shared` 包安装到 `reactivity` 中：

```bash
pnpm i @vue/shared -w --filter @vue/reactivity
```

这将会在 `reactivity` 包的 `package.json` 中添加 `@vue/shared` 作为依赖。

```json
"dependencies": {
    "@vue/shared": "workspace:*"
  }
  `
```

我们在 `shared` 中定义个一个工具函数 `isObject`，用于判断一个值是否为对象。
`vue3/packages/shared/src/index.ts`

```ts
/**
 * 判断一个值是否为对象
 * @param value - 要判断的值
 *
 * @return {boolean} - 如果值是对象则返回 true，否则返回 false
 */
export function isObject(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === "object";
}
```

然后在 `reactivity` 中使用这个工具函数：
`vue3/packages/reactivity/src/index.ts`

```ts
import { isObject } from "@vue/shared";

/**
 * 将一个对象转换为响应式对象
 *
 * @param target - 要转换的对象
 *
 * @return {T} - 返回一个响应式对象
 */
export function reactive<T extends object>(target: T): T {
  if (!isObject(target)) {
    console.warn(`reactive() expects an object but received: ${target}`);
    return target;
  }
  // 实现响应式逻辑
  return target; // 返回响应式对象
}
```
