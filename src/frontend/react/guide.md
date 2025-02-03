# React 入门

## Hooks

### useState

useState 包含以下知识点:

- 声明状态变量

  ```jsx
  const [count, setCount] = useState(0);
  ```

- 更新状态变量

  ```jsx
  <button onClick={() => setCount(count + 1)}>Click me</button>
  ```

- useState 的基本使用

```jsx
import React, { useState } from "react";

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### useEffect

useEffct 包含以下知识点:

- 副作用的概念

  - 纯函数

    ```js
    function pureFunction() {
      return 1 + 1;
    }
    ```

  - 副作用

    ```js
    function sideEffect() {
      console.log("side effect");
      // 有耗时操作
      setTimeout(() => {
        console.log("side effect");
      }, 1000);
    }
    ```

  - 执行清理操作

    - 返回一个函数，清理副作用
    - 先执行副作用，再执行清理操作

    ```js
    useEffect(() => {
      console.log("useEffect");
      return () => {
        console.log("clear");
      };
    }, []);
    ```

  - 副作用的依赖

    - 依赖项发生变化时，执行清理操作

    ```js
    useEffect(() => {
      console.log("useEffect");
    }, [count]);
    ```

- useEffect 的执行时机

  1. 渲染后执行
  2. 依赖项发生变化时执行
  3. 组件卸载时执行清理操作
  4. 修改状态会触发重新渲染 -> 执行 useEffect -> 清理操作

- useEffect 的基本使用

  ```js
  useEffect(() => {
    console.log("useEffect");
  }, []);
  ```

### 自定义 Hook

本质是自定义函数引用了 hook 去拆分比较大的业务逻辑
类似于 vue3 的 compostion api
自定义 Hook 的命名规则是 use 开头 + 驼峰命名

```js
function useCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect");
  }, [count]);
  return [count, setCount];
}
```
