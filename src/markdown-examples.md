# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

<script setup>
import TextWrapperEffect from "./TextWrapperEffect.vue";

const textContent = `前端开发不仅仅是编写代码，还包括用户体验的设计、界面的美观与实用性等。每一个功能模块的背后，都有无数次的设计和调整。随着现代浏览器的发展，Web 技术也在不断更新，从 HTML5 到 CSS3，从 ES6 到如今的 Vue、React 等前端框架，每一个技术的更新都在推动着前端的发展。而开发者不仅要掌握这些新技术，还需要不断学习，以应对复杂的项目需求。`;
</script>

引入 Vue 组件

<TextWrapperEffect :text="textContent" />

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
