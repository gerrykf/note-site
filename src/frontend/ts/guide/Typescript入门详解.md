# Typescript入门详解

## 基础语法

### 1. 变量声明

```typescript
let num: number = 42;
let str: string = "Hello, TypeScript!";
let isDone: boolean = true;
```

### 2. 类型推导

```typescript
let message = "Hello"; // 推断为 string
message = 123; // ❌ 错误：不能把 number 赋值给 string
```

### 3. 数组

```typescript
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];
```

### 4. 元组

元组（Tuple）允许不同类型的元素：

```typescript
let person: [string, number] = ["Alice", 25];
```

### 5. 枚举

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

### 6. 任意类型 `any`

> 适用于不确定类型的数据（但应尽量避免使用）：

```typescript
let something: any = "Hello";
something = 123; // ✅ 合法
```

### 7. `unknown` 类型

> 类似 `any`，但更安全：

```typescript
let data: unknown = "Hello";
if (typeof data === "string") {
  console.log(data.toUpperCase()); // ✅ 安全
}
```

### 8. `void` 类型

> void 主要用于函数的返回值：

```typescript
function logMessage(): void {
  console.log("This is a message");
}
```

### 9. `never` 类型

> 表示永远不会返回结果的类型：

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

## 函数

### 1. 基本语法

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### 2. 可选参数

```typescript
function sayHello(name: string, age?: number): string {
  return `Hello, ${name}!`;
}
```

### 3. 默认参数

```typescript
function sayHello(name: string = "Alice"): string {
  return `Hello, ${name}!`;
}
```

### 4. 剩余参数

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
```

## 接口（Interface）

接口用于定义对象的结构：

```typescript
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}

let alice: Person = {
  name: "Alice",
  age: 25,
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  },
};
```

### 1. 可选属性

```typescript
interface Person {
  name: string;
  age?: number;
}
```

### 2. 只读属性

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```

## 类(Class)

### 1. 基本类

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

const dog = new Animal("Dog");
dog.speak();
```

### 2. 继承

```typescript
class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}
```

### 3. 修饰符

- `public`：默认修饰符，所有地方都能访问
- `private`：仅能在类内部访问
- `protected`：类内部和子类可访问

```typescript
class Car {
  public brand: string;
  private speed: number;
  protected color: string;

  constructor(brand: string, speed: number, color: string) {
    this.brand = brand;
    this.speed = speed;
    this.color = color;
  }

  getSpeed(): number {
    return this.speed;
  }
}
```

## 泛型（Generics）

### 1. 泛型函数

```typescript
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(123));
```

### 2. 泛型接口

```typescript
interface Box<T> {
  value: T;
}

const box: Box<number> = { value: 123 };
```

### 3. 泛型类

```typescript
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  getItems(): T[] {
    return this.data;
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
console.log(textStorage.getItems());
```

## TypeScript 工程化

### 1. tsconfig.json 配置

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

编译 TypeScript 项目：

```bash
npx tsc
```

### 2. 配合 ESLint & Prettier

安装 ESLint：

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

安装 Prettier：

```bash
npm install --save-dev prettier eslint-config-prettier
```
