# pinia 和 vuex

## Pinia 面试题

### 1. Pinia 介绍

**面试题：Pinia 的核心 API 有哪些？**

> 回答： Pinia 是 Vue3 官方推荐的状态管理库，提供了更简单的 API、更好的 TypeScript 支持，并支持 Composition API 和 Options API。
>
> 与 Vuex 的主要区别：
>
> - 更简单：不再需要 `mutations`，直接在 `actions` 里修改 state。
> - 全类型推导：TS 支持更好，自动推导 state 类型。
> - 更加模块化：每个 Store 是独立的，使用 defineStore 定义，避免 Vuex 的单一 Store 结构。
> - 支持组合式 API：可以在 setup 中使用 Pinia 的 Store。
> - 支持服务端渲染（SSR）：更适用于 Vue3 的 SSR 方案，如 Nuxt3。

### 2. Pinia 的核心 API

**面试题：Pinia 的核心 API 有哪些？**

> 回答： Pinia 主要提供 defineStore() 这个核心 API，结合 state、getters 和 actions 进行状态管理。
>
> - `defineStore(id, storeOptions)`：定义一个 Store。
> - `state`：存储数据（相当于 Vuex 的 state）。
> - `getters`：计算属性（相当于 Vuex 的 getters）。
> - `actions`：修改 state（相当于 Vuex 的 mutations + actions）。
> - `storeToRefs(store)`：将 state 结构解包为 ref，适用于 Vue3 响应式。

### 3. Pinia 的基本使用

**面试题：Pinia 的基本使用流程是怎样的？**

> 回答：先在 stores/counter.js 或 stores/counter.ts 里定义 Store：
>
```js
import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {
 state: () => ({
   count: 0
 }),
 getters: {
   doubleCount: (state) => state.count * 2
 },
 actions: {
   increment() {
     this.count++;
   }
 }
});
```

> 在 Vue 组件中使用：

```vue
<script setup>
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double Count: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">Increment</button>
  </div>
</template>

```

### 4. Pinia 状态持久化

**面试题：如何让 Pinia 的状态持久化？**

> 回答： 可以使用 pinia-plugin-persistedstate 插件：

```bash
npm install pinia-plugin-persistedstate
```

> **在 main.js 里引入：**

```js
import { createPinia } from 'pinia';
import persist from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(persist);

export default pinia;
```

> **在 Store 里开启持久化：**

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  persist: true // 开启持久化
});
```

> 这样 count 值会存入 localStorage，刷新页面不会丢失。

### 5. Pinia  的 `storeToRefs`

**面试题：为什么要使用 `storeToRefs`？**
> **回答： 默认情况下，Pinia 的 `state` 是 响应式 Proxy，直接解构会失去响应式：**

```js
const store = useCounterStore();
const { count } = store; // 这样 count 不是响应式的！
```

> **正确的做法是用 `storeToRefs`：**

```js
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { count } = storeToRefs(store);
```

> 这样 `count` 才能保持响应式。

### 6. Pinia 适用于哪些场景？

**面试题：Pinia 适用于哪些场景？**
> 回答：
>
> - 跨组件状态共享：避免 props 逐级传递，如用户信息、主题、语言等。
> - 全局缓存数据：如 token、用户信息、购物车数据。
> - 多组件通信：代替 event bus 或 props 传递。
> - 服务端渲染（SSR）：Nuxt3 默认使用 Pinia。

### 7. Pinia 如何在 SSR（服务端渲染）中使用？

**面试题：Pinia 如何支持 SSR？**
> 回答： Pinia 提供 useSSRContext 和 hydrate 让 SSR 可以恢复状态。 示例（Nuxt 3）：

```js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    }
  },
  hydrate(state) {
    return { count: state.count };
  }
});
```

> 在 Nuxt 3 里，Pinia 自动支持 SSR，不需要额外配置。

### 8. Pinia 的模块化

**面试题：如何在 Pinia 中使用模块化 Store？**
> 回答： 在 Vuex 里，我们使用 modules，而在 Pinia 里，每个 Store 是独立的：

```js
import { defineStore } from 'pinia';

// 定义用户 Store
export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    age: 25
  }),
  actions: {
    setName(newName) {
      this.name = newName;
    }
  }
});

// 定义主题 Store
export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode;
    }
  }
});
```

> 这样可以在组件中分别引入：

```js
const userStore = useUserStore();
const themeStore = useThemeStore();
```

### 9. Pinia 如何监听 Store 变化？

**面试题：Pinia 如何监听 `state` 变化？**
> 回答： 1️⃣ 使用 `watch`：

```js
import { watch } from 'vue';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();

watch(() => counterStore.count, (newVal) => {
  console.log('count 变成:', newVal);
});
```

> 2️⃣ 使用 `$subscribe`（推荐）：

```js
counterStore.$subscribe((mutation, state) => {
  console.log('state 变化:', state.count);
});
```

## Vuex 面试题

### 1. Vuex 是什么？为什么要使用 Vuex？

**回答要点：**

Vuex 是 Vue.js 官方的状态管理库，适用于中大型应用，提供集中式管理组件间共享的状态，保证数据一致性。

为什么要用 Vuex？

- 集中式管理状态：避免组件间数据共享混乱。
- 数据响应式：基于 Vue 的响应式系统，数据更新时 UI 自动刷新。
- 单向数据流：数据流向清晰，便于调试。
- 插件生态：支持 DevTools 调试、持久化存储等功能。

### 2. Vuex 的核心概念有哪些？

**回答要点：**

Vuex 主要包含以下五大核心概念：

1. State（状态）：集中存储数据。
2. Getters（计算属性）：类似 Vue 计算属性，基于 state 生成新的数据。
3. Mutations（同步修改）：唯一修改 state 的方式，同步操作。
4. Actions（异步修改）：可以进行异步请求，最终提交 mutations 以修改 state。
5. Modules（模块化）：将 Store 分割成模块，每个模块有自己的 state、getters、mutations、actions。适用于大型应用。

### 3. 如何使用 Vuex 创建一个 Store？

**回答要点：**

安装 Vuex

```bash
npm install vuex
```

(1) 创建 store.js

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount: (state) => state.count * 2
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  }
});
```

(2) 在 main.js 引入

```js
import Vue from 'vue';
import store from './store';

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
```

(3) 组件中使用 Vuex

```vue
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['asyncIncrement'])
  }
};
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="asyncIncrement">Async Increment</button>
  </div>
</template>
```

> `mapState`, `mapGetters`, `mapMutations`, `mapActions` 是 Vuex 提供的辅助函数，用于简化代码。
>
>分别对应 `state`, `getters`, `mutations`, `actions`。 解构后可以直接在模板中使用。
>
### 4. Vuex 的 state 如何获取？

**回答要点：**

在 Vue 组件中：

```js
computed: {
  count() {
    return this.$store.state.count;
  }
}
```

或者使用 `mapState` 辅助函数：

```js
import { mapState } from 'vuex';

computed: {
  ...mapState(['count'])
}
```

### 5. Vuex 的 getters 作用是什么？

**回答要点：**

getters 类似 Vue 计算属性，基于 state 派生数据：

```js
getters: {
  doubleCount: (state) => state.count * 2
}
```

> 在组件中使用：

```js
computed: {
  ...mapGetters(['doubleCount'])
}

```

### 6. Vuex 的 mutations 和 actions 区别？

**回答要点：**

表格对比：

| 对比项 | mutations | actions |
| --- | --- | --- |
| 修改 `state` | 是 | 不能直接修改 `state` |
| 同步/异步 | 只能同步 | 支持异步 |
| 调用方式 | `commit('mutationName')` | `dispatch('actionName')` |

示例：

```js
mutations: {
  increment(state) {
    state.count++;
  }
},
actions: {
  asyncIncrement({ commit }) {
    setTimeout(() => {
      commit('increment');
    }, 1000);
  }
}
```

组件调用：

```js
methods: {
  ...mapMutations(['increment']),
  ...mapActions(['asyncIncrement'])
}
```

### 7. Vuex 的 modules 如何使用？

**回答要点：**

Vuex 允许使用 modules 将 state 拆分：

```js
const userModule = {
  state: () => ({ name: 'Alice' }),
  mutations: { setName(state, name) { state.name = name; } }
};

export default new Vuex.Store({
  modules: { user: userModule }
});
```

组件中访问：

```js
computed: {
  userName() {
    return this.$store.state.user.name;
  }
}
```

### 8. Vuex 如何实现持久化存储？

**回答要点：**

可以使用 vuex-persistedstate 插件：

```bash
npm install vuex-persistedstate
```

在 store.js 中引入：

```js
import createPersistedState from 'vuex-persistedstate';

export default new Vuex.Store({
  plugins: [createPersistedState()]
});
```

这样 state 会自动存储到 localStorage。

### 9. Vuex 4.x 和 Vuex 3.x 的区别？

**回答要点：**

- Vuex 4 主要为了兼容 Vue3，没有重大 API 变化。
- Vuex 4 使用 createStore() 而不是 new Vuex.Store()。
- Vuex 4 支持 Vue 3 的 composition API，但仍不如 Pinia 适配度高。

### 10. Vue3 是否还推荐使用 Vuex？

**回答要点：**

Vue3 官方推荐使用 Pinia，因为：

- 更简单：不再需要 mutations，直接在 actions 里修改 state。
- 全类型推导：TS 支持更好，自动推导 state 类型。
- 性能更好：基于 Vue3 的 reactive，更高效。
- 更加模块化：每个 Store 是独立的，使用 defineStore 定义。
- 生态支持：已成为 Vue 官方首选状态管理工具。

## Pinia 和 Vuex 对比

表格对比：

| 对比项 | Pinia ✅（Vue3 推荐） | Vuex ❌（Vue2 经典方案） |
| --- | --- | --- |
| 官方推荐 | Vue3 推荐，官方默认状态管理 | Vue2 官方推荐，Vue3 仍可用 |
| API 设计 | 简单直观，只有 `state`、`getters`、`actions`，无 `mutations` | 复杂，需要 `state`、`getters`、`mutations`、`actions` |
| 状态修改 | 直接修改 `state` | 只能通过 `mutations` 修改 `state` |
| 异步操作 | `actions` 支持异步 | `actions` 处理异步，mutations 仍需同步|
| Composition API 兼容 | 完美兼容 `setup()`，可用 `defineStore()` | 需要 `mapState`、`mapActions` 等辅助函数 |
| 模块化 | 直接创建多个 `store`，更清晰 | 需要 `modules` 方式组织，嵌套较复杂 |
| 类型支持 | TypeScript 友好，自动推导类型 | 需要手动定义 `mutation` 类型 |
| 性能 | 基于 Vue3 的 reactive，更高效 | Vue2 使用 Vue.observable() 性能略低 |
| 持久化 | 支持 `pinia-plugin-persistedstate`，可选字段持久化 | 需 `vuex-persistedstate`，默认无持久化 |
| SSR 支持 | 支持，Nuxt3 默认使用 Pinia | 支持，但需要额外配置 |
| 调试工具 | Vue DevTools 支持 Pinia，易用 | Vue DevTools 仍然支持 Vuex |
| 学习成本 | 简单，易学易用 | 复杂，`mutations` 规则严格 |
