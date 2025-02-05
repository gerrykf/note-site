# fetch

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <form action="" method="post">
      <label for="loginId">账号:</label>
      <input type="text" name="loginId" value="haha" />

      <label for="loginPwd">密码:</label>
      <input type="password" name="loginPwd" value="123123" />

      <button type="submit">提交</button>
    </form>
  </body>
</html>
```

```js
/**
 * fetch API 是基于 Promise 设计的，fetch() 方法返回一个 Promise 对象
 * fetch() 方法接收两个参数，第一个参数是请求的 URL，第二个参数是一个可选的配置对象
 * fetch() 方法返回的 Promise 对象在收到服务器的响应头时会变为 resolved 状态
 * fetch() 方法返回的 Promise 对象在收到网络错误时会变为 rejected 状态
 * fetch 是nodejs中的一个模块，不是浏览器的原生对象
 * @returns
 */
function handleLogin() {
  const btn = document.querySelector("button");
  btn.addEventListener("click", async function (e) {
    e.preventDefault();
    const loginId = document.querySelector('input[name="loginId"]').value;
    const loginPwd = document.querySelector('input[name="loginPwd"]').value;

    const response = await fetch("https://study.duyiedu.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginId,
        loginPwd
      })
    });

    const body = await response.json();
    if (body.code === 0) {
      alert("登录成功");
    } else {
      alert("登录失败");
    }
    console.log(body);
  });
}

handleLogin();

async function fetchHeroData() {
  // fetch() 方法返回一个 Promise 对象，当收到服务器的响应头时，Promise 对象的状态会变为 resolved，此时会调用 then() 方法指定的回调函数
  const response = await fetch("https://study.duyiedu.com/api/herolist");
  const body = await response.json();
  return body;
}

async function getHeroList() {
  await fetchHeroData().then((data) => {
    console.log(data);
    const heros = data.data;
    const ul = document.createElement("ul");
    for (const hero of heros) {
      const li = document.createElement("li");
      li.innerText = hero.cname;
      ul.appendChild(li);
    }
    document.body.appendChild(ul);
  });
}

getHeroList();
```
