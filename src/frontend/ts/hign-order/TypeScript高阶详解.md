# TypeScript高阶详解

TypeScript 高阶部分涉及 高级类型、装饰器、泛型进阶、类型推导、类型操控工具 等内容。在大型项目中，这些特性能提高 代码可读性、可复用性、类型安全性，适用于 Vue 3、React、NestJS、Node.js 等框架。

## 高级类型

### 1. 交叉类型（Intersection Types）

```typescript
type A = { name: string };
type B = { age: number };
type C = A & B; // { name: string; age: number }

const person: C = { name: "Alice", age: 25 };
```

适用于：

- 组件 props 合并
- 权限控制（多个角色合并）
- 组合多个 API 响应数据

### 2. 联合类型（Union Types）

一个变量可以是多个类型之一：

```typescript
type ID = number | string;
let userId: ID = "abc123"; // ✅
userId = 42; // ✅
```

使用 typeof 类型保护：

```typescript
function getLength(value: string | number) {
  if (typeof value === "string") {
    return value.length;
  }
  return value.toString().length;
}
```

使用 in 关键字进行类型保护：

```typescript
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```

### 3. 类型别名（Type Aliases）

适用于复杂的对象：

```typescript
type User = { id: number; name: string };
const user: User = { id: 1, name: "Alice" };
```

### 4. 索引类型（Index Types）

```typescript
type Dictionary = { [key: string]: number };
const scores: Dictionary = { Alice: 100, Bob: 95 };
```

### 5. 映射类型（Mapped Types）

批量修改对象属性：

```typescript
type ReadonlyUser = { readonly [K in keyof User]: User[K] };
type PartialUser = { [K in keyof User]?: User[K] };
```

等价于

```typescript
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
```

## 泛型 （Generics）

泛型用于编写 灵活的、可复用的类型安全代码。

### 1. 泛型函数

```typescript
function identity<T>(arg: T): T {
  return arg;
}
identity<string>("Hello"); // 显式传递泛型
identity(42); // TS 会自动推导
```

### 2. 泛型接口

```typescript
interface Box<T> {
  value: T;
}
const box: Box<number> = { value: 100 };
```

### 3. 泛型约束

```typescript
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
getLength("Hello"); // ✅
getLength([1, 2, 3]); // ✅
getLength(42); // ❌
```

### 4. 泛型默认类型

```typescript
interface ResponseData<T = any> {
  code: number;
  data: T;
}
const res: ResponseData<string> = { code: 200, data: "OK" };
```

## 类型操控工具

TypeScript 提供了一些内置工具类型，提升开发效率。

表格：

| 工具类型 | 作用 |
| --- | --- |
| `Partial<T>` | 将所有属性设置为可选 |
| `Required<T>` | 将所有属性设置为必选 |
| `Readonly<T>` | 将所有属性设置为只读 |
| `Record<K, T>` | 创建一个由 `K` 类型的属性映射到 `T` 类型的对象 |
| `Pick<T, K>` | 从 `T` 类型中挑选部分属性 |
| `Omit<T, K>` | 从 `T` 类型中排除部分属性 |
| `Exclude<T, U>` | 从 `T` 类型中排除 `U` 类型 |
| `Extract<T, U>` | 从 `T` 类型中提取 `U` 类型 |
| `NonNullable<T>` | 从 `T` 类型中排除 `null` 和 `undefined` |
| `ReturnType<T>` | 获取函数返回值类型 |

示例：

```typescript
type User = { id: number; name: string; age?: number };

type RequiredUser = Required<User>; // 所有属性必填
type ReadonlyUser = Readonly<User>; // 所有属性只读
type UserWithoutAge = Omit<User, "age">; // 移除 age
type PickedUser = Pick<User, "name">; // 只选 name
type StringKeys = Record<string, User>; // 以字符串为键
type NonNullableUser = NonNullable<User>; // 移除 null 和 undefined

// 提取U类型
type Extracted = Extract<"a" | "b" | "c", "a" | "c">; // "a" | "c"
// 排除U类型
type Excluded = Exclude<"a" | "b" | "c", "a" | "c">; // "b"
```

## 类型推导

### 1. typeof

用于获取变量的类型：

```ts
const user = { name: "Alice", age: 25 };
type UserType = typeof user; // { name: string; age: number }
```

### 2. keyof

用于获取对象的键：

```ts
type UserKey = keyof UserType; // "name" | "age"
```

### 3. infer

用于从类型推断：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

示例：

```ts
function getName(): string {
  return "Alice";
}
type NameType = ReturnType<typeof getName>; // string
```

## 抽象类

```typescript
abstract class Animal {
  abstract makeSound(): void;
}
class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
}
```

## 装饰器

### 1️⃣ 装饰器概述

TS 装饰器用于 AOP（面向切面编程），在 NestJS 中广泛应用。
类似于 Java 的注解（Annotations）和 Python 的装饰器，它可以在编译阶段扩展或修改类的行为。

✅ 使用装饰器的前提：
在 `tsconfig.json` 中启用：

```typescript
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

### 2️⃣ 装饰器的分类

TypeScript 装饰器主要有 5 种：

| 装饰器类型 | 作用 |
| --- | --- |
| 类装饰器 | 修饰整个类 |
| 方法装饰器 | 修饰类的方法 |
| 属性装饰器 | 修饰类的属性 |
| 访问器装饰器 | 修饰 getter/setter |
| 参数装饰器 |  修饰方法的参数 |

### 3️⃣ 类装饰器

类装饰器用于修改类的定义，可以用来替换类或者给类添加额外逻辑。

🚀 示例 1：添加静态属性

```typescript
function AddVersion(version: string) {
  return function (target: Function) {
    target.prototype.version = version;
  };
}

@AddVersion("1.0.0")
class TestClass {}

const obj = new TestClass() as any;
console.log(obj.version); // 输出: 1.0.0
```

✅ 作用：

- AddVersion("1.0.0") 是装饰器工厂，它返回一个真正的装饰器函数。
- 装饰器函数修改 TestClass 的 prototype，添加 version 属性。

🚀 示例 2：替换类

```typescript
function ReplaceClass(newConstructor: Function) {
  return function (target: Function) {
    return newConstructor;
  };
}

@ReplaceClass(
  class {
    name = "ReplacedClass";
  }
)
class OriginalClass {}

const obj = new OriginalClass();
console.log(obj.name); // 输出: "ReplacedClass"
```

✅ 作用：

- ReplaceClass 直接返回新类，完全替换 OriginalClass。

### 4️⃣ 方法装饰器

方法装饰器用于拦截类的方法，适合用于日志、权限控制、缓存等。

🚀 示例：日志装饰器

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`调用方法: ${propertyKey}，参数:`, args);
    return originalMethod.apply(this, args);
  };
}

class Demo {
  @Log
  sayHello(name: string) {
    console.log(`Hello, ${name}!`);
  }
}

const demo = new Demo();
demo.sayHello("Alice");
// 输出：
// 调用方法: sayHello，参数: [ 'Alice' ]
// Hello, Alice!
```

✅ 作用：

- descriptor.value 代表原方法。
- 先打印日志，再执行原方法。

### 5️⃣ 属性装饰器

属性装饰器用于增强类的属性，适合数据校验、自动绑定等场景。
🚀 示例：自动转换成大写

```typescript
function UpperCase(target: any, propertyKey: string) {
  let value: string;
  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (newValue: string) => {
      value = newValue.toUpperCase();
    },
  });
}

class User {
  @UpperCase
  name: string = "";
}

const user = new User();
user.name = "alice";
console.log(user.name); // 输出: "ALICE"
```

✅ 作用：

- set 方法拦截赋值，将内容转换成大写。

### 6️⃣ 访问器装饰器

访问器装饰器用于拦截 `getter` 和 `setter`，适合计算属性、缓存等场景。

🚀 示例：计算属性

```typescript
function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;
  let cache: any;
  descriptor.get = function () {
    if (!cache) {
      cache = originalGetter!.apply(this);
    }
    return cache;
  };
}

class Data {
  private count = 0;

  @Cache
  get expensiveValue() {
    console.log("计算 expensiveValue...");
    return ++this.count;
  }
}

const data = new Data();
console.log(data.expensiveValue); // 计算 expensiveValue... 1
console.log(data.expensiveValue); // 1（不再重新计算）
```

✅ 作用：

- Cache 装饰器让 expensiveValue 只计算 一次，后续访问返回缓存值。

### 7️⃣ 参数装饰器

参数装饰器用于拦截方法参数，适合日志、权限控制、自动注入等场景。

🚀 示例：参数日志

```typescript
function LogParameter(target: any, methodName: string, paramIndex: number) {
  console.log(`参数装饰器: 方法 ${methodName} 第 ${paramIndex} 个参数`);
}

class Person {
  greet(@LogParameter name: string) {
    console.log(`Hello, ${name}`);
  }
}

const person = new Person();
person.greet("Alice");
// 输出：参数装饰器: 方法 greet 第 0 个参数
// Hello, Alice
```

✅ 作用：

- 记录参数索引，适用于参数校验等场景。

### 8️⃣ 装饰器组合

多个装饰器从下往上执行，即先执行方法装饰器，再执行类装饰器。

🚀 示例：组合装饰器

```typescript
function Logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`调用 ${propertyKey} 方法`);
    return originalMethod.apply(this, args);
  };
}

function ReadOnly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}

class Example {
  @Logger
  @ReadOnly
  run() {
    console.log("运行...");
  }
}

const e = new Example();
e.run();
// 调用 run 方法
// 运行...
e.run = function () {}; // ❌ 失败，ReadOnly 使方法不可修改
```

✅ 执行顺序：

1. ReadOnly 先执行（修改 descriptor.writable = false）。
2. Logger 再执行（增强日志功能）。

## TypeScript 与前端框架

### 1. Vue 3 + TypeScript

```ts
<script setup lang="ts">
import { ref } from "vue";

const count = ref<number>(0);
</script>
```

### 2 React + TypeScript

```tsx
type Props = { name: string };
const Hello: React.FC<Props> = ({ name }) => <h1>Hello, {name}</h1>;
```

### 3 NestJS + TypeScript

```ts
@Controller("users")
export class UserController {
  @Get()
  getUsers(): string {
    return "All users";
  }
}
```

## 总结

TypeScript 的高阶特性能大幅提升 代码安全性、可读性和可维护性：

- 高级类型（交叉、联合、映射）
- 泛型进阶（泛型约束、默认值）
- 类型操控工具（Pick、Omit、Exclude）
- 类型推导（keyof、typeof、infer）
- OOP 特性（抽象类、装饰器）
- 框架集成（Vue、React、NestJS）
