# xhr

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  /**
   * 0: 请求未初始化
   * 1: 服务器连接已建立
   * 2: 请求已接收
   * 3: 请求处理中
   * 4: 请求已完成，且响应已就绪
   * xhr.responseText: 服务器响应的文本内容
   * xhr.responseXML: 服务器响应的 XML 内容
   * xhr.status: 服务器响应的 HTTP 状态码
   * xhr.statusText: 服务器响应的 HTTP 状态信息
   */
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      const obj = JSON.parse(xhr.responseText);
      console.log(obj);
      const heros = obj.data;
      const ul = document.createElement("ul");
      for (const hero of heros) {
        const li = document.createElement("li");
        li.innerText = hero.cname;
        ul.appendChild(li);
      }

      document.body.appendChild(ul);
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.open("GET", "https://study.duyiedu.com/api/herolist");
// xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
```
