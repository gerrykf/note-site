# 手写Promise

实现一个简单的Promise，包含以下功能：

1. Promise 构造函数接收一个函数作为参数，该函数接收两个参数：`resolve` 和 `reject`。
2. Promise 实例包含 `then` 方法，接收两个函数作为参数：`onFulfilled` 和 `onRejected`。
3. `resolve` 函数执行时，调用 `onFulfilled` 函数。
4. `reject` 函数执行时，调用 `onRejected` 函数。

## 完整代码实现

```js
class MyPromise {
  constructor(executor) {
    this.state = "pending"; // pending, fulfilled, rejected
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onFulfilledCallbacks = []; // 存放成功的回调
    this.onRejectedCallbacks = []; // 存放失败的回调

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        resolve(onFulfilled(this.value));
      } else if (this.state === "rejected") {
        reject(onRejected(this.reason));
      } else {
        this.onFulfilledCallbacks.push(() => {
          resolve(onFulfilled(this.value));
        });
        this.onRejectedCallbacks.push(() => {
          reject(onRejected(this.reason));
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }
}

// test
const errorCode = 1002;
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    if (errorCode === 1001) {
      reject("error1001");
    }
    resolve("success");
  }, 1000);
});

promise
  .then(
    (res) => {
      console.log(res);
      return "Next Step";
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  )
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Done");
  });
// 1 秒后输出
// success
// Next Step
// Done
```

## 代码执行流程解析

我们从调用 `promise.then(...).then(...).catch(...).finally(...)` 这一部分，一步步向前推理 `MyPromise` 内部发生了什么，直到 `new MyPromise(...)` 的执行过程。

### 📌 1. 创建 `MyPromise` 实例

```js
const errorCode = 1002;
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    if (errorCode === 1001) {
      reject("error1001");
    }
    resolve("success");
  }, 1000);
});
```

执行流程

1. `new MyPromise(...)` 调用 `constructor` 构造函数：

    ```js
    // （初始状态）
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    ```

    - `executor(resolve, reject)` 同步执行，但 - `setTimeout` 是异步的，所以 `executor` 立即返回，state 仍然是 `"pending"`。
2. 1 秒后，`setTimeout` 回调执行：
    - `errorCode === 1002`，所以不会 `reject`，而是 `resolve("success")`。

    - `resolve("success")` 触发以下逻辑：

        ```js
        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach((fn) => fn());
            }
        };
        ```

### 📌 2. 第一次 then 调用

```js
promise.then(
  (res) => {
    console.log(res);
    return "Next Step";
  },
  (err) => {
    console.log(err);
  }
)
```

执行流程

1. `then` 方法被调用，`onFulfilled = (res) => { console.log(res); return "Next Step"; }`
2. `then` 需要返回一个新的 `MyPromise`，因此：
    - `new MyPromise((resolve, reject) => { ... })` 被创建。
    - `this.state === "pending"`，所以 将回调存入 `this.onFulfilledCallbacks` 数组。
3. 1 秒后，`resolve("success")` 触发：
    - `onFulfilled("success")` 执行：

    ```js
    console.log(res); // success
    return "Next Step";
    ```

    输出 "success"
    - `resolve("Next Step")` 触发第二个 `then` 的执行。

### 📌 3. 第二次 then 调用

```js
promise.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
)
```

执行流程

1. `res = "Next Step"`，进入 `onFulfilled(res)`:

    ```js
    console.log(res);
    ```

    输出 "Next Step"

2. `resolve(undefined)`（因为 `console.log(res)` 没有 `return` 值）。

### 📌 4. catch 调用

```js
promise.catch((err) => {
  console.log(err);
})
```

执行流程

- 之前的 `then` 没有 `reject`，所以 `catch` 不会执行，即 `catch` 被跳过。

如果 `errorCode` 改为 `1001`，则 `reject("error1001")`，`catch` 会执行。

### 📌 5. finally 调用

```js
promise.finally(() => {
  console.log("Done");
})
```

执行流程

1. `finally` 无论 `Promise` 状态如何都会执行：

    ```js
    console.log("Done");
    ```

    输出 "Done"

2. `finally` 不会影响 `Promise` 传递的值，所以 `then` 链的返回值不变。

### 📌 6. 最终的控制台输出

```bash
success
Next Step
Done
```
