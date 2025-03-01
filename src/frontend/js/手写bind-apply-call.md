# 手写 bind、call、apply 并详细解析

JavaScript 的 bind、call 和 apply 都用于改变 this 的指向，但它们有不同的使用方式：

- call 和 apply 立即调用 函数，区别是参数的传递方式不同。
- bind 返回一个新的函数，但不会立即执行。

## 1. 手写 `call`

**`call` 方法的实现**

- `call` 允许我们指定 `this` 并立即调用函数。
- 语法：`fn.call(thisArg, arg1, arg2, ...)`
- 核心思路：
    1. 将函数临时存到 `thisArg`（避免 `this` 丢失）。
    2. 通过 `thisArg.fn()` 执行函数。
    3. 删除临时属性，返回执行结果。

```js
Function.prototype.myCall = function (context, ...args) {
  // 异常处理
  if (typeof this !== "function") {
    throw new TypeError('"myCall must be called on a function"');
  }

  // 如果context为null或者undefined，则指向globalThis
  context = context || globalThis;
  // 创建一个唯一的Symbol值，防止fn覆盖context原有属性
  const fnSymbol = Symbol("fn");
  // 将函数挂载到context上
  context[fnSymbol] = this;
  // 执行函数
  const result = context[fnSymbol](...args);
  // 删除函数
  delete context[fnSymbol];
  // 返回结果
  return result;
};

function greating(greating) {
  console.log(greating, `My name is ${this.name}, I am ${this.age} years old`);
}

const person = {
  name: "Jack",
  age: 18,
};

greating.myCall(person, "Hello");
```

## 2. 手写 `apply`

**`apply` 方法的实现**

- `apply` 和 `call` 类似，但参数以数组形式传递。
- 语法：`fn.apply(thisArg, [arg1, arg2, ...])`

```js
Function.prototype.myApply = function (context, args = []) {
  if (typeof this !== "function") {
    throw new TypeError('"myApply must be called on a function"');
  }

  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  context = context || globalThis;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

function greating(greating) {
  console.log(greating, `My name is ${this.name}, I am ${this.age} years old`);
}

const person = {
  name: "Jack",
  age: 18,
};

greating.myApply(person, ["Hello"]);
// Hello My name is Jack, I am 18 years old
```

## 3. 手写 `bind`

**`bind` 方法的实现**

- `bind` 不会立即调用，而是返回一个新的函数，可以稍后执行。
- 语法：`fn.bind(thisArg, arg1, arg2, ...)`
- 核心思路：
    1. `bind` 返回一个新的函数，并绑定 `this` 和部分参数。
    2. 新函数可以继续接收额外参数（柯里化）。
    3. 需要保证返回的函数可以作为构造函数使用（即 `new` 时 `this` 绑定到实例上）。

```js
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError('"myBind must be called on a function"');
  }

  const fn = this; // 保存原函数

  return function boundFucntion(...innerArgs) {
    return fn.apply(
      this instanceof boundFucntion ? this : context, // 判断是否是构造函数调用
      [...args, ...innerArgs]
    );
  };
};

function greating(greating) {
  console.log(greating, `My name is ${this.name}, I am ${this.age} years old`);
}

const person = {
  name: "Jack",
  age: 18,
};

const boundGreating = greating.myBind(person, "Hello");
boundGreating();
// Hello My name is Jack, I am 18 years old

function FnConstructor(name, age) {
  this.name = name;
  this.age = age;
}
const boundGreating2 = FnConstructor.myBind(null);
const tom = new boundGreating2("Tom", 20);
console.log(tom);
// FnConstructor { name: 'Tom', age: 20 }
```
