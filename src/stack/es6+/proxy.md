# Proxy（代理）

Proxy 作用：

- 用于拦截对象的操作（读取、赋值、删除、函数调用等）。
- 适用于数据劫持、权限控制、对象防篡改、自动计算属性等场景。

## ✅ 基本用法

```js
const person = {
  name: '张三',
  age: 25
};

const handler = {
  get(target, key) {
    console.log(`读取属性: ${key}`);
    return key in target ? target[key] : '属性不存在';
  },
  set(target, key, value) {
    console.log(`修改属性: ${key} => ${value}`);
    target[key] = value;
    return true;
  }
};

const proxy = new Proxy(person, handler);

console.log(proxy.name); // 读取属性: name -> '张三'
proxy.age = 30;         // 修改属性: age => 30
console.log(proxy.age);  // 30
console.log(proxy.job);  // 读取属性: job -> '属性不存在'
```

> 🔹 作用：
>
> - 拦截 get/set 操作
> - 可以控制访问逻辑，比如返回默认值、打印日志、权限校验等。

## ✅ 拦截 delete 操作

```js
const obj = { a: 1, b: 2 };
const proxy = new Proxy(obj, {
  deleteProperty(target, key) {
    console.log(`属性 ${key} 被删除`);
    delete target[key];
    return true;
  }
});
delete proxy.a; // 属性 a 被删除
console.log(proxy); // { b: 2 }
```

> 🔹 作用：
>
> - 可以拦截 delete，防止意外删除属性。

## 阻止对象被修改（深度不可变）

```js
const obj = { name: 'Alice', age: 25 };

const readonly = new Proxy(obj, {
  set(target, key, value) {
    console.warn(`不能修改 ${key}，只读模式！`);
    return false;
  },
  deleteProperty() {
    console.warn('不能删除属性，已锁定！');
    return false;
  }
});

readonly.name = 'Bob'; // 不能修改 name，只读模式！
delete readonly.age;   // 不能删除属性，已锁定！
```

> 🔹 作用：
>
> - 适用于数据保护，如防止 Vue3 的 reactive() 数据被误修改。
