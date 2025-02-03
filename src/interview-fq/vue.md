# vue 面试题

## composition api 相比于 option api 有哪些优势？

> 两个方面：
>
> 1. 为了更好的逻辑复用和代码组织
> 2. 更好的类型推导
>    有了 composition api，配合 reactivity api，可以在组件内部进行更加细粒度的控制，使得组件中不同的功能能高聚合，提升了代码的可维护性。对于不同组件的相同功能，也能更好的复用。
>    相比于 option api,composition api 中没有了指向奇怪的 this,所有的 api 变得更加函数式，这有利于和类型推断系统 比如 TS 深度配合。
