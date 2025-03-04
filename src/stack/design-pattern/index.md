# 设计模式

暂时列举出vue中常用的设计模式

## 1. 单例模式（Singleton Pattern）

📌 作用

- 保证一个类只有一个实例，并提供一个全局访问点。
- Vue 的 `Vuex`、`Pinia` 状态管理库内部使用了单例模式。

✅ TypeScript 示例

```ts
class GlobalStore {
  private static instance: GlobalStore; // 将实例保存在静态变量中
  private constructor() {} // 私有构造函数，防止外部实例化

  /**
   * 通过这个方法获取的实例 保证全局只有一个实例
   */
  static getInstance(): GlobalStore {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }
    return GlobalStore.instance;
  }
}

const store1 = GlobalStore.getInstance();
const store2 = GlobalStore.getInstance();
console.log(store1 === store2); // true
```

📌 Vue 中应用场景

- Vuex / Pinia 状态管理
- Vue `Router` 只有一个全局 `router` 实例

## 2. 观察者模式（Observer Pattern）

📌 作用

- 一对多的事件监听，当数据变化时，所有订阅者都会收到通知。
- Vue 的 响应式系统（`reactive()`、`watch()`） 使用了观察者模式。

✅ TypeScript 示例

```ts
class Observer {
  private listeners: ((data: any) => void)[] = [];

  subscribe(fn: (data: any) => void) {
    this.listeners.push(fn);
  }

  notify(data: any) {
    this.listeners.forEach((fn) => fn(data));
  }
}

// 使用观察者
const observer = new Observer();
observer.subscribe((data) => console.log("订阅者 1 收到:", data));
observer.subscribe((data) => console.log("订阅者 2 收到:", data));

observer.notify("Vue 响应式数据更新了!");
```

📌 Vue 中应用场景

- Vue `watch()` 监听数据变化
- Vue 组件通信 `Event Bus`（Vue 2 使用 `$emit` 也是观察者模式）

## 3. 工厂模式（Factory Pattern）

📌 作用

- 封装对象创建逻辑，避免 `new` 关键字到处乱用。
- Vue 组件的 `createApp()`、`Vue.extend()` 都是工厂模式的应用。

✅ TypeScript 示例

```ts
class Button {
  constructor(public label: string) {}
}

class ButtonFactory {
  static createButton(type: string): Button {
    if (type === "primary") {
      return new Button("Primary Button");
    } else {
      return new Button("Default Button");
    }
  }
}

// 创建不同类型的按钮
const btn1 = ButtonFactory.createButton("primary");
const btn2 = ButtonFactory.createButton("default");
console.log(btn1, btn2);
```

📌 Vue 中应用场景

- `createApp(App)` 创建 Vue 实例
- `Vue.extend()` 继承组件

## 4. 策略模式（Strategy Pattern）

📌 作用

- 封装不同的行为算法，允许它们在运行时互换。
- Vue 的 `computed()` 计算属性本质上就是策略模式。

✅ TypeScript 示例

```ts
class PaymentStrategy {
  pay(amount: number): void {
    throw new Error("必须实现 pay 方法");
  }
}

class WeChatPay extends PaymentStrategy {
  pay(amount: number) {
    console.log(`使用微信支付：¥${amount}`);
  }
}

class AliPay extends PaymentStrategy {
  pay(amount: number) {
    console.log(`使用支付宝支付：¥${amount}`);
  }
}

class PaymentContext {
  constructor(private strategy: PaymentStrategy) {}

  processPayment(amount: number) {
    this.strategy.pay(amount);
  }
}

// 选择不同的支付方式
const wechatPay = new PaymentContext(new WeChatPay());
wechatPay.processPayment(100);

const aliPay = new PaymentContext(new AliPay());
aliPay.processPayment(200);
```

📌 Vue 中应用场景

- `computed()` 计算属性（不同策略计算最终结果）
- Vue 表单验证（不同的验证策略）

## 5. 代理模式（Proxy Pattern）

📌 作用

- 代理访问对象，拦截/增强功能，如懒加载、权限控制等。
- Vue 3 的 `reactive()` 基于 Proxy 实现响应式数据。

✅ TypeScript 示例

```ts
const handler: ProxyHandler<object> = {
  get(target, prop) {
    console.log(`读取属性: ${String(prop)}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(`设置属性: ${String(prop)} = ${value}`);
    return Reflect.set(target, prop, value);
  },
};

const data = new Proxy({ name: "Vue", version: 3 }, handler);

console.log(data.name);
data.version = 4;
```

📌 Vue 中应用场景

- Vue 3 `reactive()` 响应式系统
- Vue 3 `computed()` 依赖收集

## 6. 适配器模式（Adapter Pattern）

📌 作用

- 转换不同的接口，使其兼容。
- Vue 2 的 `Vue.observable()` 适配 Vue 3 `reactive()`。

✅ TypeScript 示例

```ts
class LegacyLogger {
  logMessage(msg: string) {
    console.log("旧日志系统:", msg);
  }
}

class NewLogger {
  log(msg: string) {
    console.log("新日志系统:", msg);
  }
}

// 适配器，让旧系统适配新接口
class LoggerAdapter {
  constructor(private legacyLogger: LegacyLogger) {}

  log(msg: string) {
    this.legacyLogger.logMessage(msg);
  }
}

// 使用适配器
const legacyLogger = new LegacyLogger();
const adaptedLogger = new LoggerAdapter(legacyLogger);
adaptedLogger.log("兼容 Vue 2 的日志系统");
```

📌 Vue 中应用场景

- 兼容 Vue 2 的 `Vue.observable()`
- Vue 组件库适配不同 Vue 版本

## 7. 组合模式（Composite Pattern）

📌 作用

- 将多个组件组合成树形结构，类似 DOM 树。
- Vue 组件的嵌套本质上就是组合模式。

✅ TypeScript 示例

```ts
class Component {
  constructor(public name: string) {}
  operation(): void {
    console.log(`执行: ${this.name}`);
  }
}

class Composite extends Component {
  private children: Component[] = [];

  add(child: Component) {
    this.children.push(child);
  }

  operation(): void {
    console.log(`执行组合组件: ${this.name}`);
    this.children.forEach((child) => child.operation());
  }
}

const button = new Component("按钮");
const form = new Composite("表单");
form.add(button);

form.operation();
```

📌 Vue 中应用场景

- Vue 组件嵌套 (`<Form> <Button> </Form>`)
