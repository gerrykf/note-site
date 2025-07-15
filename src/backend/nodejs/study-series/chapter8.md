# npm 搭建私服

https://juejin.cn/post/7261872148213415994

https://verdaccio.org/zh-CN/

这是一个私服工具

```sh
npm install --global verdaccio
```

安装后

```sh
verdaccio
```

就可以启动私服了

```sh
npm publish --registry http://localhost:4873
```

这样会将当前目录下的 npm 包发布到本地私服上。

也可以安装

```sh
npm i xmzs -g
```

这是一个切换 npm 源的工具

```sh
mmp add
```

将私服名称、地址 添加到到选项中 例如：

名称 tools 地址：http://localhost:4873

```sh
mmp use tools
```

后面再发布就不用带 `--registry http://localhost:4873`

```sh
npm publish
```

也可以再切换为npm官方仓库

```sh   
mmp use npm
```

> 发布私服不会更新到 npm 官方仓库