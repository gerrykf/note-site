# Symbol（唯一值）

Symbol 作用：

- 创建唯一的值，不会和其他属性冲突。
- 适用于 避免对象键名重复、私有属性、实现迭代器等。

## ✅ 基本用法

```js
const key1 = Symbol('id');
const key2 = Symbol('id'); // 这是一个不同的 Symbol

console.log(key1 === key2); // false（Symbol 总是唯一的）

const user = {
  [key1]: 12345
};
console.log(user[key1]); // 12345
```

> 🔹 作用：
>
> - 创建不会冲突的对象键，防止外部修改。
> - 适用于私有属性、迭代器等场景。

## ✅ Symbol 作为对象的 "私有" 属性

```js
const SECRET_KEY = Symbol('secret');

const obj = {
  [SECRET_KEY]: '这是私有数据',
  name: '普通属性'
};

console.log(obj[SECRET_KEY]); // 这是私有数据
console.log(Object.keys(obj)); // ["name"]
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(secret)]
```

> 🔹 作用：
>
> - `Symbol` 属性不会被 `Object.keys()` 枚举，相当于隐藏私有数据。

## ✅ 用 Symbol 定义常量，避免魔法字符串

```js
const TYPE_A = Symbol('A');
const TYPE_B = Symbol('B');

function getType(type) {
  switch (type) {
    case TYPE_A: return '类型 A';
    case TYPE_B: return '类型 B';
    default: return '未知类型';
  }
}

console.log(getType(TYPE_A)); // 类型 A
```

> 🔹 作用：
>
> - 避免 "A"、"B" 这样的字符串硬编码，防止命名冲突。

## ✅ Symbol.iterator 实现迭代器

```js
const arr = ['a', 'b', 'c'];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: 'c', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

> 🔹 作用：
>
> - 实现迭代器，支持 `for...of` 循环。
