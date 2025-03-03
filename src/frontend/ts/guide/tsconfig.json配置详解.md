# tsconfig.json 配置详解

`tsconfig.json` 是 TypeScript 项目的配置文件，主要用于指定编译器选项、文件包含规则等内容。它的作用是告诉 TypeScript 编译器如何编译项目中的 `.ts` 或 `.tsx` 文件。

## 1. `tsconfig.json` 的基本结构

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

其中：
    - `compilerOptions`：指定 TypeScript 编译器选项。
    - `include`：指定需要编译的文件或目录。
    - `exclude`：指定不需要编译的文件或目录。

## 2. `compilerOptions` 详细解析

`compilerOptions` 影响 TypeScript 编译的方式，主要选项如下：

### 1. **基础选项**

- `"target"`: 指定编译后 JavaScript 代码的目标版本。例如：
  - `"ES5"`：兼容旧浏览器（转换 `let/const` 等）
  - `"ESNext"`：保持最新特性
- `"module"`: 指定模块化方案，如：
  - `"CommonJS"`（Node.js 常用）
  - `"ESNext"`（适用于 Vite、Webpack 等现代前端工具）
- `"lib"`: 设定使用的标准库，比如：

        ```json
        "lib": ["ESNext", "DOM"]
        ```

  - `"ESNext"` 允许使用最新 JavaScript API
  - `"DOM"` 允许访问 `document`、`window` 等浏览器 API

### 2. **路径相关**

- `"outDir"`：编译后输出的目录。
- `"rootDir"`：源代码所在目录（通常是 `"src"`）。
- `"baseUrl"`：用于解析模块的基准目录（适用于 `paths`）。
- `"paths"`：用于配置别名：

        ```json
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
        }
        ```

    > 这样就可以使用 `import xx from "@/utils"` 而不用写 `import xx from "../../utils"`。

### 3. **严格模式**

`"strict"`：是否启用所有严格模式（推荐开启）。
`"strictNullChecks"`：是否检查 `null` 和 `undefined`。
`"noImplicitAny"`：是否禁止隐式 `any` 类型（推荐开启）。
`"strictFunctionTypes"`：是否检查函数类型是否严格匹配。

### 4. **代码检查**

- `"forceConsistentCasingInFileNames"`：确保文件大小写一致（防止大小写问题）。
- `"skipLibCheck"`：跳过第三方库的类型检查（可以加快编译）。
- `"noUnusedLocals"`：检查未使用的局部变量（清理无用代码）。
- `"noUnusedParameters"`：检查未使用的函数参数。
- `"noImplicitReturns"`：要求函数所有分支都要 `return`。
- `"noFallthroughCasesInSwitch"`：防止 `switch` 语句中的 `case` 语句意外贯穿。

## 3. `include` 和 `exclude`

这两个字段决定哪些文件会被 TypeScript 编译：

```json
"include": ["src"],
```

- 只会编译 src 目录下的 .ts 文件。

```json
"exclude": ["node_modules", "dist"]
```

- 忽略 node_modules 和 dist 目录。

> 如果既不写 include 也不写 exclude，默认会编译所有 .ts 文件（除了 node_modules）。

## 4. `extends` 继承配置

可以继承已有的 `tsconfig.json` 规则，避免重复配置：

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "strict": false
  }
}
```

- `extends` 允许多个项目共享相同的配置，比如 `tsconfig.base.json`。

## 5. `tsconfig.json` 在 Vite / Vue3 / Node.js 项目中的应用

### 1. Vite 项目（Vue3 + TypeScript）

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "Node",
        "strict": true,
        "jsx": "preserve",
        "baseUrl": ".",
        "paths": {
        "@/*": ["src/*"]
        }
    },
    "include": ["src"]
}
```

- `module` 和 `moduleResolution` 设为 `ESNext`，适配 Vite。
- `jsx` 设为 `preserve`，支持 Vue3 `tsx` 语法。

### 2. Node.js 项目

```json
{
"compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "strict": true,
    "outDir": "dist"
},
"include": ["src"]
}
```

- `module` 设为 `CommonJS`，适配 Node.js。
- `outDir` 指定编译后输出目录。

## 6. `tsconfig.node.json`

如果项目需要同时支持前端（Vite）和后端（Node.js），可以创建多个 `tsconfig`：

- tsconfig.json（默认配置）
- tsconfig.node.json（Node 专用）
- tsconfig.app.json（前端专用）

示例：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```

然后在 `package.json` 里：

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.node.json"
  }
}
```

> 这样就能分别编译前端和后端代码。

## 7. 常见问题

### 1. `Cannot find module` 错误

- 确保 `baseUrl` 和 `paths` 正确配置。
- 在 `vite.config.ts` 里加上：

    ```ts
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'

    export default defineConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    })
    ```

### 2. `Cannot use import statement outside a module`

- 在 `package.json` 里加 `"type": "module"`（适用于 ESNext）。
- 或者在 `tsconfig.json` 里改 `module` 为 `CommonJS`。

### 3. `Property 'X' does not exist on type 'Y'`

- 可能是类型推导问题，检查 `strict`、`strictNullChecks` 设置。
