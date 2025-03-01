# Reflect（反射）

Reflect 作用：

- Reflect 提供了操作对象的标准方法（类似 Object，但更强大）。
- 简化 Proxy 处理，让代理逻辑更一致、可读性更好。

## ✅ 结合 Proxy 使用

```js
const obj = { name: 'Tom', age: 20 };

const proxy = new Proxy(obj, {
  get(target, key) {
    console.log(`访问属性 ${key}`);
    return Reflect.get(target, key); // 等价于 target[key]
  },
  set(target, key, value) {
    console.log(`设置 ${key} 为 ${value}`);
    return Reflect.set(target, key, value);
  }
});

proxy.name; // 访问属性 name
proxy.age = 30; // 设置 age 为 30
```

> 🔹 Reflect.get(target, key) vs target[key]
>
> - Reflect.get() 避免抛出错误，比如对象 undefined 时不会报错。
> - Reflect.set() 可以返回 true/false，明确表示是否成功设置。

## ✅ 判断对象是否有某个属性

```js
console.log(Reflect.has({ name: '张三' }, 'name')); // true
console.log(Reflect.has({ name: '张三' }, 'age'));  // false
```

> 🔹 等价于 in 运算符，但语法更清晰

## ✅ Reflect.apply() 代替 Function.prototype.apply()

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(Reflect.apply(greet, null, ['张三'])); // Hello, 张三!
```

> 🔹 作用：
>
> - 和 apply 一样，但更加标准化，可用于函数动态调用。
