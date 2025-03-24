# html相关面试题

## 1. 什么是 `<!DOCTYPE>`? 是否需要在 HTML5 中使用?

`<!DOCTYPE>` 是 HTML 文档的声明，用于告诉浏览器当前文档使用的 HTML 版本。在 HTML5 中，`<!DOCTYPE html>` 是一个简化的声明，在HTML5中不再需要指定 DTD（文档类型定义）。

> 考察文档声明的概念，以及 HTML5 的简化声明方式。

## 2. 什么是严格模式与混杂模式?

浏览器渲染模式分为三种：

- **怪异模式/混杂模式** （`quirks mode`）：浏览器以一种向后兼容(兼容不标准的网页)的方式解析渲染页面。
- **严格模式**（`standards mode`）：浏览器按照 W3C 标准解析渲染页面。
- **几乎标准模式**（`almost standards mode`）：在严格模式下，但有一些行为与标准不一致。

因为在早期的浏览器中存在很多不符合标准的页面，为了向后兼容，浏览器提供了混杂模式，以支持这些不符合标准的页面。

> 考察渲染模式

## 3. 列举怪异模式中的怪癖行为

1. Quirks 模式下设置图片的`padding`会失效
2. Quirks 模式下`Table`中的字体属性不能继承上层的设置
3. Quirks 模式下`white-space: pre`会失效
4. Quirks 模式下可以设置行内元素的`width`和`height`
5. Quirks 模式下宽高的算法与W3C盒模型不同

> 考察浏览器的怪异模式

## 4. 什么是 HTML 语义化?

HTML 语义化是指使用恰当的标签（`<h1>`-`<h6>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<form>` 等）来描述文档结构，使文档结构更清晰，便于开发者阅读和维护。

语义化的优点：

- 有利于 SEO，搜索引擎更容易理解页面内容
- 有利于开发者阅读和维护
- 有利于协作开发，提高代码质量
- 方便其他设备解析，例如：盲人阅读器等辅助技术更容易理解页面内容
- 有利于移动端开发，语义化标签更容易适配移动端

> 考察 HTML 标签的语义化

## 5. W3C 标准组织

- W3C指万维网联盟（World Wide Web Consortium）是一个国际性的标准组织，致力于推动 Web 技术的发展。W3C 的使命是制定 Web 标准，以确保 Web 的长期发展。
- W3C 是一个会员制组织，其中包含了来自全球各地的成员，包括公司、政府机构、非营利组织等。
- W3C 的工作是对 Web 技术进行标准化，以确保不同浏览器之间的兼容性，提高 Web 的可访问性和可用性。

W3C 成员包括：

- IBM
- 微软
- 苹果
- 谷歌
- Adobe

不由任何一个公司控制，而是由一个由全球各地的成员组成的委员会控制。

W3C 规范的批准流程：

- W3C 收到一份提交
- 由 W3C 发布一份记录
- 由 W3C 创建一个工作组
- 由 W3C 发布一份工作草案
- 由 W3C 发布一份候选推荐
- 由 W3C 发布一份提名推荐
- 由 W3C 发布一份推荐

> 考察 W3C 标准组织

## 6. SEO

SEO（Search Engine Optimization）是指通过优化网站结构和内容，提高网站在搜索引擎中的排名，从而获得更多的流量。

如何优化 SEO：

- 合理的 title、description、keywords 等 meta 标签
  - title 标签是页面的标题，搜索引擎会根据 title 标签来判断页面的主题（一般不超过 80 个字符）
  - description 标签是页面的描述，搜索引擎会根据 description 标签来显示搜索结果的描述（一般不超过 150 个字符）
  - keywords 标签是页面的关键词，搜索引擎会根据 keywords 标签来判断页面的关键词（不超过 3 个关键词，每个关键词不宜过长）
- 语义化的 HTML 结构
- 合理的标题标签使用
- 非装饰性图片，必须添加`alt`属性
- 对于不显示的对象谨慎使用`display: none`，可以使用`visibility: hidden`或者`z-index: -1`代替
- 重要的HTML代码放在前面（搜索引擎会优先读取前面的代码）
- 少用iframe，搜索引擎不会抓取iframe中的内容
- 添加 robots.txt 文件 (告诉搜索引擎哪些页面可以抓取，哪些页面不可以抓取)

## 7. iframe

### 7.1. 什么是 iframe?

iframe 是 HTML 中的一个内联框架，可以在一个 HTML 文档中嵌入另一个 HTML 文档。

```html
<iframe src="https://www.baidu.com"></iframe>
```

### 7.2. iframe 的优缺点

- 优点：
  - 可以实现无刷新上传文件
  - 可以实现跨域通信
  - 可以实现网页嵌套
- 缺点：
  - 会增加页面的加载时间
  - 会影响页面的性能
  - 爬虫无法识别 iframe 中的内容

他的优点可以使用ajax实现

## 8. 微格式

微格式（Microformats）是一种用于在 HTML 文档中嵌入语义化信息的技术，通过在 HTML 标签中添加特定的 class、rel等 属性，来标记文档中的信息。

以前的写法：

::: details 点击查看代码

```html
<a href="http://www.example.com" class="url">www.example.com</a>
<a href="http://www.about.com" class="url" >www.about.com</a>
```

:::

::: details 点击查看代码

```html
<div>
  <span>张三</span>
  <span>123456789</span>
</div>
```

:::

微格式写法：

示例1：

::: details 点击查看代码

```html
<a href="http://www.example.com" class="url" rel="homepage">www.example.com</a>
<a href="http://www.about.com" class="url" rel="aboutpage">www.about.com</a>
```

:::
示例2：
::: details 点击查看代码

```html
<div class="vcard">
  <span class="fn">张三</span>
  <span class="tel">123456789</span>
</div>
```

:::

通过为已有的链接添加 rel 属性，这个链接添加了具体的结构和意义。

微格式一般用来标记一些常见的信息，例如：人名、地址、电话号码、日期、组织、地点、产品、评论等。

微格式的优点：

- 爬虫更容易识别页面内容
- 有利于人机阅读，更容易理解页面内容
- 有利于协作开发，提高代码质量
- 方便其他设备解析，例如：盲人阅读器等辅助技术更容易理解页面内容
- 有利于移动端开发，语义化标签更易于适配移动端

微格式链接：[http://microformats.org/](http://microformats.org/)

## 9. 替换元素和非替换元素

### 9.1. 替换元素

指的是一些展现效果不由css控制，而是由元素本身的内容决定的元素。例如：`<img>`、`<iframe>`、`<video>`、`<audio>`等。

常见的替换元素

- `<img>`：图片
- `<iframe>`：内联框架
- `<video>`：视频
- `<audio>`：音频

### 9.2. 非替换元素

指的是元素的内容由css控制的元素。例如：`<p>`、`<h1>~<h6>`、`<ul>`、`<li>`、`<table>`、`<form>`等。

常见的非替换元素

- `<p>`：段落
- `<h1>~<h6>`：标题
- `<ul>`：无序列表
- `<li>`：列表项
- `<table>`：表格
- `<form>`：表单

## 10. 页面可见性

### 10.1. 什么是页面可见性，它有什么用途？

页面可见性（Page Visibility）是指页面在浏览器中的可见性，即页面是否在当前浏览器窗口中可见。

- 可以用于节省资源，例如：当页面不可见时，可以暂停视频播放、音频播放等
- 可以用于统计用户行为，例如：当用户切换到其他页面时，可以统计用户的停留时间
- 可以用于提高用户体验，例如：当用户切换到其他页面时，可以暂停自动播放的视频

### 10.2. 页面可见性 API？

页面可见性 API（Page Visibility API）是 HTML5 中的一个新特性，用于检测页面是否可见。

页面可见性 API 提供了两个事件：

- `visibilitychange`：当页面可见性状态发生变化时触发
- `visibilityState`：页面的可见性状态，有三个值：`visible`、`hidden`、`prerender`
::: details 点击查看代码

```js
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "visible") {
    console.log("页面可见");
  } else {
    console.log("页面不可见");
  }
});
```

:::
常见用途：

- 当页面不可见时，暂停视频播放、音频播放等
- 当页面不可见时，统计用户停留时间
- 当页面不可见时，暂停自动播放的视频
- 暂停轮询请求等
