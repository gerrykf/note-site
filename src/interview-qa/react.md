# React 面试题

## 1. Hooks 的底层原理？

理解 Hooks 内部运行机制

### 1️⃣ **Hooks 运行流程概览**

在 React 组件渲染时，Hooks 依赖 React 内部的 Fiber 数据结构，通过链表存储 `useState`、`useEffect` 等 Hook 状态，并在组件更新时保持状态不变。

👇 核心流程图（简化版）：

```plaintext
组件初始化
   ↓
创建 Fiber 对象 (每个组件都有自己的 Fiber)
   ↓
执行 Hooks (useState/useEffect 等)
   ↓
将 Hooks 依次存入 Fiber 的 memoizedState 链表
   ↓
组件更新时，依靠 memoizedState 取回状态
   ↓
完成渲染
```

### 2️⃣ **useState 的底层实现**

🔹 代码示例

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return <button onClick={increment}>{count}</button>;
}
```

🔹 **底层如何运行？**

1️⃣ **组件首次渲染时**

- React 在 Fiber 节点 上创建 `memoizedState` 单向链表，存储 Hook 状态。
- `useState(0)` 创建 `{ state: 0, next: null }`，存入 Fiber。
- 组件渲染后，React 记住 `count = 0`。

2️⃣ **组件更新时**

- `setCount(count + 1)` 触发更新。
- React 不会重新创建 state，而是找到 `memoizedState`，修改 `state` 的值。
- 组件重新渲染，读取最新 `count`，保证状态不变。

👇 底层数据结构示意图

```plaintext
Fiber 节点
 ┌────────────────────────────────────────────┐
 │ memoizedState (Hook 状态链表)             │
 │ ┌──────────────┐  ┌──────────────┐         │
 │ │ state: 0     │→ │ state: 1     │→ null   │
 │ │ next: null   │  │ next: null   │         │
 │ └──────────────┘  └──────────────┘         │
 └────────────────────────────────────────────┘

```

### 3️⃣ **useEffect 的底层执行机制**

`useEffect` 主要用于执行副作用（如 API 请求、事件监听等），在组件更新后执行。

🔹 代码示例

```jsx
useEffect(() => {
  console.log("组件挂载或更新");
  return () => console.log("组件卸载");
}, []);

// 依赖数组为空时，只在组件挂载和卸载时执行
```

🔹 底层执行流程

1️⃣ 首次渲染时

- `useEffect` 注册副作用函数 `console.log("组件挂载或更新")`，存入 Fiber memoizedState。
- 由于依赖数组 `[]` 为空，仅在组件挂载时执行。

2️⃣ 组件更新时

- React 对比依赖数组，如果依赖没变，不执行 effect。
- 如果依赖变化，先执行 `cleanup`（卸载逻辑），然后执行 `effect`。

👇 底层数据结构示意图

```plaintext
Fiber 节点
 ┌────────────────────────────────────────────────┐
 │ memoizedState (Hook 状态链表)                 │
 │ ┌───────────────────┐  ┌───────────────────┐ │
 │ │ effect: fn        │→ │ cleanup: fn       │ │
 │ │ dependencies: []  │  │ dependencies: []  │ │
 │ └───────────────────┘  └───────────────────┘ │
 └────────────────────────────────────────────────┘
```

### 4️⃣ **Hooks 如何保证调用顺序？**

React 依赖 调用顺序 确保 Hooks 状态正确存取：

- useState、useEffect 调用时，React 通过 链表存取。
- 不能在条件语句、循环中调用 Hooks，否则状态链表顺序会错乱，导致 bug。

👇 错误示例（状态错乱）

```jsx
function Counter() {
  if (condition) {
    const [count, setCount] = useState(0); // ❌ 错误调用
  }
}
```

❌ 这样会导致 memoizedState 索引错乱，状态异常！

### 5️⃣ **总结**

✅ React 通过 Fiber 结构维护 Hooks 状态，使用单向链表存储。

✅ useState 通过 memoizedState 记录状态，每次更新时取最新值。

✅ useEffect 依赖依赖数组比对，在挂载/更新/卸载时执行副作用。

✅ Hooks 调用顺序必须一致，不能写在条件或循环里，否则状态错乱。

🎯 最后一句话概括：Hooks 其实是一个数组（链表），React 通过索引保证它们的正确性！ 🚀

## 2. `React Fiber` 了解吗？  

**🎯 一句话理解：**

React Fiber 是 React 16 引入的新架构，用于优化 UI 更新，它让 渲染任务可以拆分、暂停、恢复和丢弃，从而提升应用的流畅度和响应速度。

### 1️⃣ **为什么 React 需要 Fiber？（问题的由来）**

React 15 之前，React 采用 Stack Reconciler 算法，递归遍历虚拟 DOM，一旦开始渲染，无法中断，可能导致页面卡顿。

✅ 小组件更新没问题，但

❌ 如果组件树太大，整个 UI 更新会阻塞主线程，导致卡顿和掉帧！

例如👇：

```plaintext
渲染一个超大组件树（React 15）
    ┌── Root
    │   ├── 组件 A
    │   │   ├── 组件 B
    │   │   │   ├── 组件 C
    │   │   │   ├── 组件 D
    │   │   ├── 组件 E
    │   └── 组件 F
（一次性同步完成，无法中断）
```

如果这棵树特别深，UI 线程会被占满，导致掉帧！

💡 Fiber 的解决方案：

- 让 UI 更新 可以被拆分（不用一次性更新全部）。
- 支持任务优先级调度（比如：用户输入比动画更重要）。
- 可以暂停和恢复更新（不会阻塞主线程）。

### 2️⃣ **什么是 Fiber？**

Fiber 本质上是 React 组件树的一种新的数据结构（Fiber Node），它让 React 的更新变得更灵活！

🚀 Fiber 的核心特性

1️⃣ 链表结构：不像 React 15 的递归调用，Fiber 用链表存储组件树，遍历时可暂停和恢复。

2️⃣ 任务可中断：Fiber 可以分批执行，不会一次性渲染整个 UI。

3️⃣ 优先级调度：重要任务（如用户输入）优先，次要任务（如动画）稍后执行。

4️⃣ 双缓存机制（双 Fiber 树）：减少不必要的重复计算，提高性能。

👇 Fiber 的数据结构（一个 Fiber 其实是一个对象）：

```plaintext
{
  type: FunctionComponent, // 组件类型（函数/类组件）
  stateNode: 绑定的真实 DOM,
  child: 指向子 Fiber,
  return: 指向父 Fiber,
  sibling: 指向兄弟 Fiber,
  alternate: 指向旧 Fiber（用于 diff 对比）
}
```

👉 Fiber 让 React 从"同步的递归计算"变成"增量的链表遍历"，这样可以 分步执行，避免 UI 卡顿！ 🚀

### 3️⃣ **Fiber 的工作原理**

Fiber 主要分 两步更新：

1. Reconciliation 阶段（协调阶段）:找出需要更新的地方（可中断）。
2. Commit 阶段（提交阶段）:把更新应用到 DOM（不可中断）。

📌 阶段 1：Reconciliation（协调 & Diff 计算）

目标：创建 新的 Fiber 树，计算哪些节点需要更新。

🚀 关键优化点： ✅ 增量渲染（Time-Slicing）——任务可拆分，避免长时间阻塞。

✅ 优先级调度——用户输入比动画更优先。

✅ 任务可中断 & 恢复——如果有更高优任务，先执行高优任务。

Fiber 遍历示意图（深度优先遍历）：

```plaintext
        Root Fiber
           ↓
        组件 A
       ↙      ↘
  组件 B      组件 E
   ↓
组件 C → 组件 D
```

📌 阶段 2：Commit（提交 & DOM 更新）

目标：把计算好的 Fiber 树 提交到真实 DOM，更新 UI。

🔥 关键优化：双缓存机制（Dual Fiber Tree）

- current Fiber Tree（当前 UI）
- workInProgress Fiber Tree（工作中 UI=新的 UI）

流程：

1. 计算新 UI，生成新的 Fiber 树（workInProgress）。
2. 计算完成后，直接交换 current 和 workInProgress，提高性能！

```plaintext
before update:
   current Fiber Tree → 旧 UI

after update:
   workInProgress Fiber Tree → 新 UI
   current Fiber Tree ← 交换完成
```

### 4️⃣ **React Fiber 的优势**

🚀 相较于 React 15，Fiber 带来了以下优化： ✅ 任务可拆分——避免长时间主线程阻塞，提高 UI 响应速度。

✅ 优先级调度——让用户交互（如输入）更流畅，不受动画影响。

✅ 双缓存机制——减少无意义的重复计算，提高性能。

✅ Hooks（useState, useEffect）依赖 Fiber，保证状态管理正确。

### 5️⃣ **直观比喻：React Fiber = 更聪明的“快递员”**

🚴 React 15（老快递员）

- 以前的 React 15 就像一个老快递员，把所有快递打包成一个大包裹，一次性送完，路上不能停下。
- 如果包裹太大，路上遇到障碍，就会耽误时间，导致其他快递延误(UI掉帧)。

🚀 React Fiber（新快递员）

- Fiber 像一个更聪明的快递员，他会分批送快递，优先送紧急快递（高优任务），遇到堵车时（主线程忙）可以停下来稍后继续。

### 6️⃣ **总结**

🚀 React Fiber = 更高效的 Diff + 可中断更新 + 任务优先级管理

1️⃣ Reconciliation（协调）：构建新的 Fiber 树，可中断、分片执行。

2️⃣ Commit（提交）：更新 DOM，执行副作用（useEffect、生命周期方法）。

3️⃣ 双缓存机制：减少无意义的重复计算，提高性能。

🔥 一句话总结：Fiber 让 React 变得更快、更流畅，是高性能 UI 渲染的核心！ 🚀💪

## 3.`useMemo` 和 `useCallback` 区别？

`useMemo` 和 `useCallback` 都是 React 提供的性能优化 Hook，它们的主要作用是避免不必要的计算和函数重新创建，但它们的适用场景不同：

### 1. **`useMemo`** --- 记忆计算结果

- 作用：缓存计算结果，避免不必要的重新计算。
- 适用场景：当计算过程开销较大时，避免每次渲染都重新计算，提高性能。
- 使用方式：

    ```tsx
    const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b]);
    ```

- 例子：

    ```tsx
    const sum = useMemo(() => {
        console.log('计算 sum');
        return a + b;
    }, [a, b]);
    ```

  - 只有 a 或 b 发生变化时，才会重新计算 sum。

### 2. **`useCallback`** --- 记忆函数引用

- 作用：缓存函数，避免不必要的函数重新创建，防止子组件不必要的重新渲染。
- 适用场景：
    1. 当函数作为 props 传递给子组件时，避免子组件不必要的重新渲染。
    2. 结合 useEffect 依赖项，防止 effect 触发过多次。
- 使用方式：

    ```tsx
    const memoizedCallback = useCallback(() => {
        someFunction(a, b);
    }, [a, b]);
    ```

- 例子：

    ```tsx
    const handleClick = useCallback(() => {
        console.log('按钮点击', count);
    }, [count]);
    ```

  - 只有 count 发生变化时，才会重新创建 handleClick 函数。

### 3. **区别对比**

| Hook | 作用 | 适用场景 | 返回值 |
| --- | --- | --- | --- |
| `useMemo` | 缓存计算结果 | 计算开销大时优化性能 | 计算结果 |
| `useCallback` | 缓存函数引用 | 传递给子组件的回调函数避免不必要的渲染 | 函数引用 |

📌 直观理解：

- useMemo(fn, deps) 👉 返回 fn() 计算后的值，用于缓存计算结果。
- useCallback(fn, deps) 👉 返回 fn 本身，用于缓存函数，避免函数地址变化。

如果你只是缓存一个计算值，使用 useMemo；如果你是缓存一个函数，使用 useCallback。

🚀 最佳实践：

- 不要过度使用，只有当计算量大或子组件不必要的渲染影响性能时才使用。
- `useCallback` 通常与 `React.memo` 配合使用，防止组件不必要的重新渲染：

    ```tsx
    const MemoButton = React.memo(({ onClick }) => {
        console.log('子组件渲染');
        return <button onClick={onClick}>Click Me</button>;
    });

    const App = () => {
        const [count, setCount] = useState(0);

        const handleClick = useCallback(() => {
            setCount((prev) => prev + 1);
        }, []);

        return <MemoButton onClick={handleClick} />;
    };
    ```

  - handleClick 没有变化，所以 MemoButton 不会重新渲染。

这样可以减少性能损耗，提高应用的效率！🚀

## 4. `Redux` 和 `Context` 的使用场景？

`Redux` 和 `Context` 都是 React 状态管理方案,都可以用于跨组件状态管理，但适用场景不同，下面我们来对比一下：

### 1. **Redux 适用场景**

✅ 适用于全局、复杂状态管理，例如：

- 应用级别的全局状态（如用户信息、主题、权限、购物车等）。
- 需要跨多个组件共享的状态（如不同页面、不同组件层级之间的数据传递）。
- 有明确的状态流向和修改逻辑（如 action → reducer → store）。
- 状态较复杂，需要集中管理、可预测、可追踪（如 Redux DevTools）。
- 多人协作的大型项目，Redux 更适合管理复杂的业务逻辑。

🔹 Redux 使用示例：

```tsx
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// 创建 Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

const { actions, reducer } = counterSlice;
const store = configureStore({ reducer: { counter: reducer } });

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.decrement())}>-</button>
    </div>
  );
};

// 组件根部包裹 Provider
const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);
```

### 2. **Context API 适用场景**

✅ 适用于简单、局部状态共享，例如：

- 主题、语言、认证信息（轻量级、变更不频繁）。
- 避免 prop drilling（属性层层传递），但不涉及复杂的状态管理。
- 仅在少量组件之间共享数据（通常是父组件及其子组件）。

⚠️ 不适合频繁更新的状态：

- React Context 依赖 useContext，每次状态更新时，所有使用该 Context 的组件都会重新渲染。
- 如果状态更新很频繁（如输入框、计数器等），会影响性能，建议用 Redux 或 useReducer+useContext 组合优化。

🔹 Context 使用示例：

```tsx
import React, { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext();

// 提供者组件
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 消费 Context
const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前主题：{theme}
    </button>
  );
};

// 使用 Provider
const App = () => (
  <ThemeProvider>
    <ThemeButton />
  </ThemeProvider>
);
```

### 3. **Redux vs Context：如何选择？**

表格对比：

| 特性 | Redux | Context API |
| --- | --- | --- |
| 适用场景 | 复杂全局状态管理 | 简单局部状态共享 |
| 状态管理方式 | 集中管理，有 `store` 和 `reducer` 组织 | 去中心化，状态分散在不同的 `Provider` 中 |
| 数据流 | 单向数据流（`action` → `reducer` → `store` → 组件） | 直接由 `Provider` 传递数据 |
| 性能 | 优化更新，可使用 `Redux Toolkit`、`Reselect` | Context 会导致所有订阅组件重新渲染 |
| 工具支持 | Redux DevTools、Redux Middleware（`redux-thunk`、`redux-saga`） | 无 DevTools，无法追踪状态变化 |
| 适合状态类型 | 适合复杂状态（如用户信息、权限、购物车） | 适合简单状态（如主题、语言） |

### 4. **什么时候用 Redux，什么时候用 Context？**

- ✅ 用 Redux：
  - 状态需要在多个组件间共享（如跨页面、跨模块）。
  - 状态更新频繁，需优化渲染性能。
  - 需要中间件（如异步数据处理）。
  - 项目较大，团队协作，需要清晰的状态管理方式。
- ✅ 用 Context：
  - 仅在局部组件层级共享状态，避免 prop drilling。
  - 状态较少，变更不频繁（如主题、语言）。
  - 组件嵌套较深，但不涉及复杂业务逻辑。

- ⚠️ Redux vs Context 选择建议
  - 如果状态只是父子组件共享，并不会涉及全局管理，优先用 `useContext`。
  - 如果状态影响多个组件、且可能会扩展，用Redux 更合适。
  - 如果状态更新很频繁，避免直接使用 `useContext`，可以用`useReducer` + `useContext`，或者直接上 Redux。

### 5. **`Redux` 和 `Context` 结合使用？**

在实际开发中，可以 Context 处理局部状态，Redux 处理全局状态，比如：

- Redux 管理全局数据（用户信息、权限、购物车）。
- Context 处理 UI 级别的状态（主题、弹窗状态）。

示例：

```tsx
<Provider store={store}>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</Provider>
```

这样 Redux 处理全局数据，Context 处理 UI 状态，实现最佳性能优化。

### **总结**

- Redux 适合全局、复杂状态管理，适用于跨组件共享的大规模应用。
- Context 适合局部、轻量级状态，主要用来避免 prop drilling。
- 如果状态更新频繁，避免直接用 Context，而是用 useReducer 或 Redux。

如果只是组件间通信，不涉及复杂的状态管理，用 Context 即可。如果是大规模项目，有复杂的状态管理需求，推荐用 Redux 🚀！
