# NPX

npx 的优势

1. 避免全局安装：`npx` 允许你执行 npm package，而不需要你先全局安装它。
2. 总是使用最新版本：如果你没有在本地安装相应的 npm package，`npx` 会从 npm 的 package 仓库中下载并使用最新版。
3. 执行任意 npm 包：`npx` 不仅可以执行在 `package.json` 的 scripts 部分定义的命令，还可以执行任何 npm package。
4. 执行 GitHub gist：`npx` 甚至可以执行 GitHub gist 或者其他公开的 JavaScript 文件。
