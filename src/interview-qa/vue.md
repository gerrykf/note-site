# Vue面试题

- [Vue面试题](#vue面试题)
  - [Vue2 \& Vue3 语法差异？](#vue2--vue3-语法差异)
    - [1. **Composition API vs Options API**](#1-composition-api-vs-options-api)
    - [2. **响应式系统**](#2-响应式系统)
    - [3. **声明周期钩子变更**](#3-声明周期钩子变更)
    - [4. **全局API**](#4-全局api)
    - [5. **Fragments**](#5-fragments)
    - [6. **事件监听**](#6-事件监听)
    - [7. **异步组件**](#7-异步组件)
  - [`composition API` 使用？](#composition-api-使用)
  - [`setup` 的执行时机？](#setup-的执行时机)
  - [Vue3 `ref/reactive` 区别？](#vue3-refreactive-区别)
  - [Vue3 的 `Teleport`、`Suspense` 用过吗？](#vue3-的-teleportsuspense-用过吗)
  - [Vue2 `mixin` 和 Vue3 `composition API` 组合式函数如何替代？](#vue2-mixin-和-vue3-composition-api-组合式函数如何替代)
  - [为什么 vue3 中去掉了 vue 构造函数？](#为什么-vue3-中去掉了-vue-构造函数)
  - [vue3 数据响应式的理解](#vue3-数据响应式的理解)

## Vue2 & Vue3 语法差异？

Vue3相较于Vue2主要在以下几个方面:

### 1. **Composition API vs Options API**

- Vue2 主要使用 Options API（`data`、`methods``computed` 等）
- Vue3 引入了 Composition API（`setup`、`reactive``ref`、`computed`等）

### 2. **响应式系统**

- Vue2 使用 `Object.defineProperty` 实现数据劫持，无法新增属性或数组索引变化。
- Vue3 使用 `Proxy`,可以监听新增属性和数组索引。

### 3. **声明周期钩子变更**

- Vue2： `beforeCreate` 、`created`、`beforeMount`、`mounted` 等
- Vue3： `setup` 代替 `beforeCreate` 和 `created`，其余钩子名字前加 `on`，如 `onMounted`

### 4. **全局API**

- Vue2：`Vue.mixin()`、`Vue.component()`、`Vue.use()`、`Vue.directive()`、`Vue.filter()` 等
- Vue3：这些方法移动到 `app` 实例，如 `app.mixin()`、`app.component()`、`app.use()`、`app.directive()`、`app.filter()` 等

### 5. **Fragments**

- Vue2：模板中只能有一个根元素
- Vue3：支持多个根元素，不需要额外的标签包裹

### 6. **事件监听**

- Vue2 `$listeners`
- Vue3 `$attrs` 统一包含 `listeners` 和 `attrs`

### 7. **异步组件**

- Vue2：`Vue.component('AsyncComp',()=> import('./Comp.vue'))` 异步组件
- Vue3：直接`defineAsyncComponent()`

## `composition API` 使用？

Composition API 允许在 setup 中使用 ref、reactive、computed、watch、watchEffect、provide/inject 等函数，将组件的逻辑进行拆分，使代码逻辑更加模块化和复用。

```js
<script setup>
import { ref, computed, watch } from 'vue';

const count = ref(0);
const double = computed(() => count.value * 2);

watch(count, (newVal) => {
  console.log(`Count changed to: ${newVal}`);
});

const increment = () => count.value++;
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

## `setup` 的执行时机？

- 在 `beforeCreate` 和 `created` 之前执行.
- 此时 `this` 还未创建，无法放问`this`相关的属性和方法
- 适用于 `Composition API`, 用于初始化响应式变量、计算属性、监听器等

```js
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('Mounted');
});
</script>
```

## Vue3 `ref/reactive` 区别？

表格对比：

| 特性       | ref     | reactive         |
| --------- | ---------- | ------------ |
| 适用对象  | 原始值、对象   | 仅适用于对象 |
| 访问方式  | .value       | 直接访问 |
| 解包行为  | ref 在 template 里自动解包 | reactive 不解包 |
| 嵌套行为  | 嵌套对象不会自动变成响应式 | 嵌套对象自动响应式 |

示例：

```js
<script setup>
import { ref, reactive } from 'vue';

const count = ref(0);
const person = reactive({ name: 'Alice', age: 25 });

console.log(count.value); // 访问 ref 需要 .value
console.log(person.age); // 直接访问 reactive
</script>
```

## Vue3 的 `Teleport`、`Suspense` 用过吗？

- `Teleport`：允许组件渲染到 DOM 结构外部，可以用于模态框、弹出框等场景

```vue
<template>
  <teleport to="body">
    <div class="modal">弹窗</div>
  </teleport>
</template>
```

- `Suspense` 用于等待异步组件加载。

可以包裹异步组件，提供 `fallback` 插槽，用于在异步组件加载时显示占位内容

```vue
<template>
  <suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
```

## Vue2 `mixin` 和 Vue3 `composition API` 组合式函数如何替代？

Vue2 `mixin` 会导致命名冲突、数据来源不清晰等问题，Vue3 使用 `composition API` 可以更好的解决这些问题。

Vue2 `mixin`：

```js
// mixins/counterMixin.js
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
```

```js
<script>
// components/Counter.vue
import counterMixin from '../mixins/counterMixin';

export default {
  mixins: [counterMixin],
  template: `<button @click="increment">{{ count }}</button>`
};
</script>
```

Vue3 `composition API`：

```js
// composables/useCounter.js
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}
```

```js
<script setup>
import { useCounter } from './composables/useCounter';

const { count, increment } = useCounter();
</script>
```

Composition API 比 Mixin 更清晰、更易于维护。

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
