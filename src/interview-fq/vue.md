# 面试题

## composition api 相比于 option api 有哪些优势？

> 两个方面：
>
> 1. 为了更好的逻辑复用和代码组织
> 2. 更好的类型推导
>    有了 composition api，配合 reactivity api，可以在组件内部进行更加细粒度的控制，使得组件中不同的功能能高聚合，提升了代码的可维护性。对于不同组件的相同功能，也能更好的复用。
>    相比于 option api,composition api 中没有了指向奇怪的 this,所有的 api 变得更加函数式，这有利于和类型推断系统 比如 TS 深度配合。

## 谈谈你对 vite 的理解

### webpack 打包构建流程

1. 给它一个入口文件
2. 它通过入口文件去找依赖(会找到很多的模块，这些模块包含 js 模块，css 模块，包含图片)
3. webpack 进行打包，通过 loader、plugin 等打包 生成打包文件
4. 启动一个开发服务器
5. 我们访问这个开发服务器 webpack 就会把这些打包结果响应给我们

### vite 打包构建流程

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

## 为什么 vue3 中去掉了 vue 构造函数？

vue2 的全局构造函数带来了诸多问题：

1. 调用构造函数的静态方法会对所有 vue 应用生效，不利于隔离不同应用
2. vue2 的构造函数集成了太多功能，不利于 tree shaking，vue3 把这些功能使用普通函数导出，能够充分利用 tree shaking 优化打包体积
3. vue2 没有把组件实例和 vue 应用两个概念区分开，在 vue2 中，通过 new Vue 创建的对象，既是一个 vue 应用，同时又是一个特殊的 vue 组件。vue3 中，把两个概念区别开来，通过 createApp 创建的对象，是一个 vue 应用，它内部提供的方法是针对整个应用的，而不再是一个特殊的组件。

## vue3 数据响应式的理解

vue3 不再使用 Object.defineProperty 的方式定义完成数据响应式，而是使用 Proxy。

除了 Proxy 本身效率比 Object.defineProperty 更高之外，由于不必递归遍历所有属性，而是直接得到一个 Proxy。

所以在 vue3 中，对数据的访问是动态的，当访问某个属性的时候，再动态的获取和设置，这就极大的提升了在组件初始阶段的效率。

同时，由于 Proxy 可以监控到成员的新增和删除，因此，在 vue3 中新增成员、删除成员、索引访问等均可以触发重新渲染，而这些在 vue2 中是难以做到的。

## 谈一下 Pinia 的使用？

> 参考答案：
>
> 在 Pinia 中，核心概念有
>
> - state：仓库的核心，主要是用于维护仓库的数据
> - getters：用于对数据做二次计算的，等同于 store 的 state 的计算值
> - actions ：对仓库状态进行操作的方法
>
> 相比 Vuex，Pinia 中没有 mutations，同步方法和异步方法都放在 actions 里面。Pinia 同时支持 Vue2 和 Vue3，内部支持两种编码风格，分别是：
>
> - 选项式 API ：编码风格基本就和之前的 Vuex 是相似的
> - 组合式 API ： 编码风格和 Vue3 非常相似，使用 ref 或者 reactive 来定义仓库数据，使用 computed 来做 getters，actions 里面的方法直接书写即可，最后将数据和方法通过 return 导出。
