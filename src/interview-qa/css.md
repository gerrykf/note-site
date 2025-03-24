# CSS 相关面试题

## 1. CSS 单位总结

### 1.1. CSS 中的绝对长度和相对长度单位

- 绝对长度单位：`cm`、`mm`、`in`、`px`、`pt`、`pc`

    > 绝对长度单位是固定的，不会随着屏幕分辨率的变化而变化。

    ::: details 点击查看代码

    ```css
    /* 1cm = 96px/2.54 */
    /* 1mm = 1/10th of 1cm */
    /* 1in = 2.54cm = 96px */
    /* 1pt = 1/72 of 1in */
    /* 1pc = 12pt */
    ```

    ```html
    <div style="width: 1cm; height: 1cm;"></div>
    <div style="width: 1mm; height: 1mm;"></div>
    <div style="width: 1in; height: 1in;"></div>
    <div style="width: 1px; height: 1px;"></div>
    <div style="width: 1pt; height: 1pt;"></div>
    <div style="width: 1pc; height: 1pc;"></div>
    ```

    :::

- 相对长度单位：`em`、`rem`、`ex`、`ch`、`vw`、`vh`、`vmin`、`vmax`

    > 相对长度单位是相对于其他长度单位的长度单位。

    ::: details 点击查看代码

    ```css
    /* em：相对于父元素的字体大小 */
    /* rem：相对于根元素的字体大小 */
    /* ex：字体 x-height 的高度 */
    /* ch：数字 0 的宽度 */
    /* vw：视口宽度的百分比 */
    /* vh：视口高度的百分比 */
    /* vmin：视口宽度和高度中较小的那个 */
    /* vmax：视口宽度和高度中较大的那个 */
    ```

    ```html
    <div style="font-size: 16px;">
        <div style="width: 1em; height: 1em;"></div>
        <div style="width: 1rem; height: 1rem;"></div>
        <div style="width: 1ex; height: 1ex;"></div>
        <div style="width: 1ch; height: 1ch;"></div>
        <div style="width: 1vw; height: 1vh;"></div>
        <div style="width: 1vmin; height: 1vmin;"></div>
        <div style="width: 1vmax; height: 1vmax;"></div>
    </div>
    ```

    :::

    > `vw`、`vh`、`vmin`、`vmax` 是相对于视口的宽度和高度。
    >
    > 使用场景：移动端适配、响应式布局。

### 1.2. `em` 和 `rem` 的区别

- `em`：相对于父元素的字体大小
- `rem`：相对于根元素的字体大小

::: details 点击查看代码

```html
<div class="parent">
    <div class="child">em</div>
    <div class="child">rem</div>
</div>
```

```css
/* em */
.parent {
    font-size: 16px;
}

.child {
    font-size: 1em; /* 16px */
}

/* rem */
html {
    font-size: 16px;
}

.child {
    font-size: 1rem; /* 16px */
}
```

:::

## 2. 居中方式总结

### 2.1. 水平居中

- 行内元素：`text-align: center;`

    ::: details 点击查看代码

    ```html
    <div>水平居中</div>
    ```

    ```css
    div {
        text-align: center;
    }
    ```

    :::

- 块级元素：`margin: 0 auto;`

    ::: details 点击查看代码

    ```html
    <div>水平居中</div>
    ```

    ```css
    div {
        width: 100px;
        margin: 0 auto;
    }
    ```

    :::

- 绝对定位：`left: 50%; transform: translateX(-50%);`

    ::: details 点击查看代码

    ```html
    <div>水平居中</div>
    ```

    ```css
    div {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    ```

    :::

- flex 布局：`justify-content: center;`

    ::: details 点击查看代码

    ```html
    <div>水平居中</div>
    ```

    ```css
    div {
        display: flex;
        justify-content: center;
    }
    ```

    :::

### 2.2. 垂直居中

- 行内元素：`line-height: height;`

    ::: details 点击查看代码

    ```html
    <div >垂直居中</div>
    ```

    ```css
    div {
        height: 100px;
        line-height: 100px;
    }
    ```

- 块级元素：`margin: auto;`

    ::: details 点击查看代码

    ```html
    <div>垂直居中</div>
    ```

    ```css
    div {
        height: 100px;
        margin: auto;
    }
    ```

    :::

- 绝对定位：`top: 50%; transform: translateY(-50%);`

    ::: details 点击查看代码

    ```html
    <div>垂直居中</div>
    ```

    ```css
    div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    ```

    :::

- flex 布局：`align-items: center;`

    ::: details 点击查看代码

    ```html
    <div>垂直居中</div>
    ```

    ```css
    div {
        display: flex;
        align-items: center;
    }
    ```

    :::

### 2.3. 水平垂直居中

- 绝对定位：`top: 50%; left: 50%; transform: translate(-50%, -50%);`

    ::: details 点击查看代码

    ```html
    <div>水平垂直居中</div>
    ```

    ```css
    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    ```

    :::

- flex 布局：`justify-content: center; align-items: center;`

    ::: details 点击查看代码

    ```html
    <div>水平垂直居中</div>
    ```

    ```css
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ```

    :::

## 3. 隐藏元素方式总结

### 3.1. 完全隐藏

> 完全隐藏：元素不占据空间，不可见。

- `display: none;`

::: details 点击查看代码

```html
<div>完全隐藏</div>
```

```css
div {
    display: none;
}
```

:::

- 标签属性：`hidden`

::: details 点击查看代码

```html
<div hidden>完全隐藏</div>
```

:::

### 3.2. 视觉上的隐藏

> 视觉上的隐藏：元素占据空间，但不可见。

- 将元素隐藏但在dom树中 `visibility: hidden;`

    ::: details 点击查看代码

    ```html
    <div>视觉上隐藏</div>
    ```

    ```css
    div {
        visibility: hidden;
    }
    ```

    :::

- 将元素设置为透明 `opacity: 0;`

    ::: details 点击查看代码

    ```html
    <div>视觉上隐藏</div>
    ```

    ```css
    div {
        opacity: 0;
    }
    ```

    :::

- 将元素设置到-1层 `z-index: -1;`

    ::: details 点击查看代码

    ```html
    <div>视觉上隐藏</div>
    ```

    ```css
    div {
        z-index: -1;
    }
    ```

    :::

- 通过定位将元素移出可视区域 `position: absolute; left: -9999px;`

    ::: details 点击查看代码

    ```html
    <div>视觉上隐藏</div>
    ```

    ```css
    div {
        position: absolute;
        left: -9999px;
    }
    ```

    :::

- 设置宽高为 0：`width: 0; height: 0;`

    ::: details 点击查看代码

    ```html
    <div>视觉上隐藏</div>
    ```

    ```css
    div {
        width: 0;
        height: 0;
    }
    ```

    :::

- 裁剪元素 `clip-path: inset(100%);`

    ::: details 点击查看代码

    ```html
    <div>语义上隐藏</div>
    ```

    ```css
    div {
        clip-path: inset(100%);
    }
    ```

    :::

### 3.3. 语义上的隐藏

> 语义上的隐藏：元素占据空间，但不可见，但是可以通过屏幕阅读器读取。

- `aria-hidden="true"`

    ::: details 点击查看代码

    ```html
    <div aria-hidden="true">语义上隐藏</div>
    ```

    :::

## 4. 浮动

### 4.1. 浮动的背景

> 为了实现文字环绕图片的效果
  
::: details 点击查看代码

```html
<div class="parent">
    <img src="https://picsum.photos/200/200" alt="图片">
    <p>文字环绕图片的效果</p>
</div>
```

```css
img {
    float: left;
}
```

:::

### 4.2. 浮动的作用

> 使元素脱离文档流，向左或向右移动，直到其外边缘碰到包含块的边缘或另一个浮动元素的边缘。

::: details 点击查看代码

```html
<div class="parent">
    <div class="child">浮动元素</div>
</div>
```

```css
.parent {
    width: 200px;
    height: 200px;
    background-color: #f0f0f0;
}

.child {
    width: 100px;
    height: 100px;
    background-color: #ff0;
    float: left;
}
```

:::

### 4.3. 清除浮动的方法

- 空`div` 清除浮动

    ::: details 点击查看代码

    ```html
    <div class="parent">
        <div class="child">浮动元素</div>
        <div style="clear: both;"></div>
    </div>
    ```

    ```css
    .parent {
        width: 200px;
        height: 200px;
        background-color: #f0f0f0;
    }

    .child {
        width: 100px;
        height: 100px;
        background-color: #ff0;
        float: left;
    }
    ```

    :::

- 使用伪元素清除浮动

    ::: details 点击查看代码

    ```html
    <div class="parent">
        <div class="child">浮动元素</div>
    </div>
    ```

    ```css
    .parent {
        width: 200px;
        height: 200px;
        background-color: #f0f0f0;
    }

    .child {
        width: 100px;
        height: 100px;
        background-color: #ff0;
        float: left;
    }

    .parent::after {
        content: "";
        display: block;
        clear: both;
    }
    ```

    :::

- 使用 `clearfix` 清除浮动

    ::: details 点击查看代码

    ```html
    <div class="parent">
        <div class="child">浮动元素</div>
    </div>
    ```

    ```css
    .parent {
        width: 200px;
        height: 200px;
        background-color: #f0f0f0;
    }

    .child {
        width: 100px;
        height: 100px;
        background-color: #ff0;
        float: left;
    }

    .clearfix::after {
        content: "";
        display: block;
        clear: both;
    }
    ```

    :::

- 使用 `BFC` 清除浮动

    ::: details 点击查看代码

    ```html
    <div class="parent">
        <div class="child">浮动元素</div>
    </div>
    ```

    ```css
    .parent {
        width: 200px;
        height: 200px;
        background-color: #f0f0f0;
        overflow: hidden;
    }

    .child {
        width: 100px;
        height: 100px;
        background-color: #ff0;
        float: left;
    }
    ```

    :::

## 5. 定位总结

### 5.1. position 有哪些属性值？及各自的作用

- `static`：默认值，元素在正常文档流中。
- `relative`：相对定位，元素相对于自身原来的位置进行定位。
- `absolute`：绝对定位，元素相对于最近的非`static`定位的父元素进行定位。
- `fixed`：固定定位，元素相对于浏览器窗口进行定位。
- `sticky`：粘性定位，元素在跨越特定阈值前为相对定位，之后为固定定位。
    > 适用场景：表头固定。
    >
    > 注意点：`sticky` 会在父元素的边界内停止，不会超出父元素。
    > - 父元素的`overflow`属性值必须是`visible`，`hidden`，`scroll`，`auto`。
    > - 父元素的高度不能低于`sticky`元素的高度。
    > - 如果父元素没有设置定位（position:relative|absolute|fixed），则`sticky`元素相对于`viewport`进行定位，否则相对于父元素进行定位。
    > - 设置阈值：`top`、`left`、`right`、`bottom` 四个阈值中的任意一个，才可以触发`sticky`效果。

    position: sticky; 示例：

    ::: details 点击查看代码

    ```html
    <div class="parent">
        <div class="child">粘性定位</div>
    </div>
    ```

    ```css
    .parent {
        position: relative;
        height: 200px;
        overflow: auto;
    }

    .child {
        position: sticky;
        top: 0;
    }
    ```

    :::

### 5.2. 相对定位、绝对定固定定位的区别

- 相对定位(relative)：元素相对于自身原来的位置进行定位。不会脱离文档流。
- 绝对定位(absolute)：元素相对于最近的非`static`定位的父元素进行定位。 会脱离文档流。

> 设置成`absolute`的元素 `display` 属性会变成 `block`，如果想要设置成 `inline` 需要设置 `display: inline-block;`
>
> 他的参考点：
>
> - 如果父元素是`static`，则参考点是`body`
> - 如果父元素是`relative`，则参考点是父元素的左上角
> - 如果父元素是`absolute`，则参考点是父元素的左上角
> - 如果父元素是`fixed`，则参考点是浏览器的左上角

::: details 点击查看代码

```html
<div class="parent">
    <div class="child">相对定位</div>
    <div class="child">绝对定位</div>
</div>
```

```css
.parent {
    position: relative;// 这里只要是非static的定位都可以
}

.child {
    position: relative;
    top: 10px;
}

.child:nth-child(2) {
    position: absolute;// 找到最近的非static的定位的父元素，从这个父元素开始定位
    top: 10px;
}
```

:::

- 固定定位(fixed)：元素相对于浏览器窗口进行定位。 会脱离文档流。

::: details 点击查看代码

[在 CodePen 运行](https://codepen.io/pen/?editors=1100)

```html
<div class="parent">
    <div class="child">固定定位</div>
</div>
```

```css
.child {
    position: fixed;
    top: 10px;
}
```

:::

## 6. BFC

### 6.1. 介绍BFC 及其应用

BFC: 块级格式化上下文，是一个独立的渲染区域，只有Block-level Box参与，它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
> BFC 是一个独立的布局环境，BFC 内部的元素布局与外部布局不会互相影响。

BFC 的布局规则：

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。
3. 每个盒子的左外边缘（margin-left）会触碰到容器的左边缘（对于从右到左的格式化，右外边缘会触碰到右边缘）。
4. BFC 的区域不会与 float box 重叠。
5. BFC 是页面上的一个独立容器，容器里面的子元素不会影响到外面的元素，反之也如此。
6. 计算 BFC 的高度时，浮动元素也参与计算。

::: details 点击查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BFC</title>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        div {
            width: 100px;
            height: 100px;
            /* 发生了外边距重叠 */
            margin: 30px;
        }

        .one {
            background-color: red;
        }

        .two {
            background-color: blue;
        }
    </style>
</head>

<body>
    <div class="one"></div>
    <div class="two"></div>
</body>

</html>
```

:::

::: details 查看示例结果

<iframe src="data:text/html;charset=utf-8,
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>BFC 测试</title>
    <style>
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
        div { width: 100px; height: 100px;margin: 30px;}
        .one {  background-color: red; }
        .two { background-color: blue; }
    </style>
</head>
<body>
    <div class='one'></div>
    <div class='two'></div>
</body>
</html>"
width="300" height="150" style="border:1px solid #ccc;">
</iframe>

:::
设置成一个BFC的方式：

| 元素或属性 | 属性值 |
| --- | --- |
| float | left、right |
| position | absolute、fixed |
| overflow | hidden、auto、scroll、overlay、touch |
| display | inline-block、table-cell、table-caption、flex、inline-flex |

BFC 的应用场景：

1. 浮动后防止父元素高度塌陷

    ::: details 点击查看代码

    ```html
    <!-- 正常父元素的高度取决于子元素，但是子元素浮动后(脱离了文档流) 父元素就没有高度了 -->
    <div class="parent">
        <div class="child">浮动元素</div>
    </div>
    ```

    ```css
    .parent {
        overflow: hidden;
    }

    .child {
        float: left;
    }
    ```

    :::

其他示例参考 [BFC 的应用场景](../frontend/css/BFC.md#搞懂各种-fc)

### 6.2. 介绍 BFC 、IFC、GFC、FFC

- BFC：块级格式化上下文，是一个独立的渲染区域，只有 Block-level Box 参与，它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。
- IFC：行内格式化上下文，是一个独立的渲染区域，只有 Inline-level Box 参与，它规定了内部的 Inline-level Box 如何布局，并且与这个区域外部毫不相干。
- GFC：网格格式化上下文，是一个独立的渲染区域，只有 Grid Box 参与，它规定了内部的 Grid Box 如何布局，并且与这个区域外部毫不相干。
- FFC：自适应格式化上下文，是一个独立的渲染区域，是一个既不是 BFC 也不是 IFC 的东西。

## 7. CSS 属性计算过程

1. [确定声明值](../frontend/css/CSS属性的计算过程.md#确定声明值)
2. [层叠冲突](../frontend/css/CSS属性的计算过程.md#层叠冲突)
3. [使用继承](../frontend/css/CSS属性的计算过程.md#使用继承)
4. [使用默认值](../frontend/css/CSS属性的计算过程.md#使用默认值)

## 8. CSS 层叠继承规则总结

### 8.1. 简述 CSS 层叠继承规则

1. 解决层叠冲突
    - 重要性：`!important`
    - 专用性：选择器的权重
    - 源代码顺序：后写的样式会覆盖先写的样式
2. 解决继承值问题
    > 没有声明值时，会继承父元素的值。

## 9. import 指令

[CSS引用方式有哪些？ link和@import有什么区别？](../frontend/css/import指令.md#来看看-import-指令是啥)

## 10. CSS3 的calc()函数

[CSS3 的calc()函数](../frontend/css/CSS3的calc函数.md#真题解答)

## 11. CSS3 的媒介查询（Media Queries）

[CSS3 的媒介查询](../frontend/css/CSS3的媒介(media)查询.md#真题解答)

## 12. 过度和动画事件

### CSS3中 transition 和 animation 的属性分别有哪些？

- transition：过渡动画
  - transition-property：规定设置过渡效果的 CSS 属性的名称。
  - transition-duration：规定完成过渡效果需要多少秒或毫秒。
  - transition-timing-function：规定速度效果的速度曲线。
  - transition-delay：定义过渡效果何时开始。
  - transition：是 `transition-property`、`transition-duration`、`transition-timing-function` 和 `transition-delay` 的简写属性。
  - 示例：

    ::: details 点击查看代码

    ```html
    <div class="box"></div>
    ```

    ```css
    .box {
        width: 100px;
        height: 100px;
        background-color: salmon;
        margin: 0 auto;
    }

    .box:hover {
        width: 200px;
        height: 200px;
        background-color: tan;
        transition: all 1s;// 
    }

    .box:hover {
        width: 200px;
        height: 200px;
        background-color: tan;
    }

    ```

    :::

### css动画是如何实现的？

- animation：动画
  - animation-name：规定 `@keyframes` 动画的名称。
  - animation-duration：规定动画完成一个周期所花费的秒或毫秒。
  - animation-timing-function：规定动画的速度曲线。
  - animation-delay：规定动画何时开始。
  - animation-iteration-count：规定动画被播放的次数。
  - animation-direction：规定动画是否在下一周期逆向地播放。
  - 示例：

    ::: details 点击查看代码

    ```html
    <div class="box"></div>
    ```

    ```css
    .box {
        width: 100px;
        height: 100px;
        background-color: salmon;
        margin: 0 auto;
        animation: move 2s linear infinite;
    }
    @keyframes move {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(200px);
        }
    }
    ```

    :::

## 13. 渐进增强和优雅降级

### 说说渐进增强和优雅降级的理解？

- 渐进增强：从功能出发，保证所有用户都能访问网站的基本内容和功能，然后再针对高级浏览器进行效果和交互的增强。
- 优雅降级：从效果出发，先构建完整的功能和效果，然后再针对低级浏览器进行兼容。

## 14. CSS3 变形

### CSS3 变形属性

- `transform`：变形
  - `translate`：移动
  - `rotate`：旋转
  - `scale`：缩放
  - `skew`：倾斜
  - `matrix`：矩阵
  - 示例：

    ::: details 点击查看代码

    ```html
    <div class="box"></div>
    ```

    ```css
    .box {
        width: 100px;
        height: 100px;
        background-color: salmon;
        margin: 0 auto;
        transform: translate(100px, 100px) rotate(45deg) scale(1.5, 1.5) skew(30deg, 30deg);
    }
    ```

    :::

## 15. 渐进式渲染

### 什么是渐进式渲染？

  渐进式渲染：惰性渲染，指的是为了提高用户感知的加载速度。以尽快的速度来呈现页面的技术。

这不是值得某一项技术，而是各个技术的一种集合,通常使用的技术包括：

- 骨架屏

    ::: details 点击查看代码

    ```html
    <div class="skeleton">
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
    </div>
    ```

    ```css
    .skeleton {
        display: flex;
    }

    .skeleton-item {
        width: 100px;
        height: 100px;
        background-color: #f0f0f0;
    }

    @keyframes skeleton {
        0% {
            background-color: #f0f0f0;
        }
        50% {
            background-color: #e0e0e0;
        }
        100% {
            background-color: #f0f0f0;
        }
    }
    ```

- 图片懒加载：优先加载视窗显示的图片，延迟加载视窗外的图片。

    ::: details 点击查看代码

    ```html
    <img src="loading.gif" data-src="image.jpg" alt="图片">
    ```

    ```css
    img {
        width: 100px;
        height: 100px;
    }
    ```

    ```javascript
    // 使用 js api 实现图片懒加载
    window.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    ```

    :::

- 图片占位符：先用一个占位的图片，等图片请求完成后再将占位图进行替换
- 拆分网页资源：大部分用户不会用到网站的所有页面，但我们通常的做法确实把所有功能都打包进一个很大的文件里面。一个bundle.js 文件的大小可能就会有几M,一个大包后的style.css 会包含网站的一切样式，从css结构定义到网站在各个版本的样式：移动端、平板、桌面、打印版等。

   > 用户并不是一来是就需要所有的资源，所以我们可以对资源进行拆分，首先加载那些关键的资源，其他的资源等到需要的时候再去加载它。
  
## 16. CSS 渲染性能优化

### 总结一下如何提升或优化css的渲染性能?

1. 用户角度
    网站优化能够让页面加载更快，响应更及时，极大地提升用户体验
2. 服务商角度
    优化会减少页面资源请求数，减少请求支援所占带宽大小，从而节省可观的带宽资源

Google和亚马逊亚研究表明 用户的留存率在5s内加载完毕的网站是最高的，而在10s内加载完毕的网站留存率就会下降50%。

[推荐参阅 CSS 规范-优化方案：](http://nec.netease.com/standard/css-optimize.html)

## 17. 堆叠上下文

层叠上下文指在css中，一个元素可以在z轴上与其他元素重叠，z轴上的垂直顺序由其堆叠上下文决定。

创建堆叠上下文的方法：

1. 根元素, 即html元素

    ::: details 点击查看代码

    ```html
    <div class="one"></div>
    <div class="two"></div>
    ```

    ```css
    div{
        width: 100px;
        height: 100px;
    }
    .one {
        background-color: red;
    }
    .two {
        background-color: blue;
        margin-top: -50px;// 两个元素重叠
    }
    ```

    :::
2. 普通元护士设置position 的属性为非static 并且设置 z-index 值为数值

    ::: details 点击查看代码

    ```html
    <div class="one"></div>
    <div class="two"></div>
    ```

    ```css
    div{
        width: 100px;
        height: 100px;
    }
    .one {
        background-color: red;
        position: relative;
        z-index: 1;
    }
    .two {
        background-color: blue;
        position: relative;
        z-index: 2;
    }
    ```

    :::
3. css3中的新属性也可以产生堆叠上下文
    - 父元素的display属性值为flex、inline-flex,子元素的z-index值不为auto，子元素为层叠上下文元素
    - 元素的opacity值不是1
    - 元素的transform值不是none
    - 元素的mix-blend-mode值不是normal
    - 元素的filter值不是none
    - 元素的isolation值是isolate
    - will-change设置了任意css属性值，即使没有设置值也会创建堆叠上下文
    - 元素的 -webkit-overflow-scrolling 属性被设置为 touch

    ::: details 点击查看代码

    ```html
    <div class="box">
        <div class="parent">
            parent
            <div class="child">child</div>
        </div>
    </div>
    ```

    ```css
    .box {
        width: 100px;
        height: 100px;
        background-color: red;
    }

    .parent {
        width: 50px;
        height: 50px;
        background-color: blue;
        z-index: 1;// 未设置position属性 说以是普通元素
    }

    .child {
        width: 25px;
        height: 25px;
        background-color: green;
        position: absolute;
        z-index: -1;// 会在父元素的下面
    }
    ```

    :::

## 18. CSS3 遮罩

### css3中的遮罩是什么？

- 遮罩是一种覆盖在元素上的半透明的颜色或图像，用于遮挡元素的一部分内容。
- 遮罩可以通过`mask`属性来实现，`mask`属性是一个简写属性，包括`mask-image`、`mask-mode`、`mask-repeat`、`mask-position`、`mask-clip`、`mask-origin`、`mask-size`、`mask-composite`等属性。

### 遮罩各个属性的作用

- `mask-image`：定义遮罩图像。
- `mask-mode`：定义遮罩模式。
- `mask-repeat`：定义遮罩图像的重复方式。
- `mask-position`：定义遮罩图像的位置。
- `mask-clip`：定义遮罩的裁剪区域。
- `mask-origin`：定义遮罩的原点。
- `mask-size`：定义遮罩的尺寸。
- `mask-composite`：定义遮罩的合成方式。

::: details 点击查看代码

```html
<div class="box"></div>
```

```css
.box {
    width: 100px;
    height: 100px;
    background-color: red;
    -webkit-mask-image: url('mask.png');
    -webkit-mask-mode: alpha;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-clip: border-box;
    -webkit-mask-origin: border-box;
    -webkit-mask-size: cover;
    mask-image: url('mask.png');
    mask-mode: alpha;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-clip: border-box;
    mask-origin: border-box;
    mask-size: cover;
    mask-composite: add;
}
```

:::
