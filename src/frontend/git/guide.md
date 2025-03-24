# Git 基础指南

## 创建 SSH Key

```ts
ssh-keygen -t rsa -C "your email@example.com"
```

## 配置用户信息

### 全局配置

如果你希望在所有仓库中使用同一套用户信息，可以使用全局配置：

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

### 仓库级别配置

如果你希望在某个仓库中使用与全局配置不同的用户信息，可以进入该仓库目录，然后执行不带 --global 参数的命令：

```bash
git config user.name "你的名字"
git config user.email "你的邮箱@example.com"
```

## 基础使用

### 初始化仓库

```ts
git init // 在当前目录创建一个git代码库
or
git init [project-name] //创建一个目录，将其初始化为git代码库
```

### 提交代码到远程的工作流程

#### 工作区->暂存区的操作

> 将文件添加到暂存区

```ts
git add [files1] [files2] ... //添加指定文件
or
git add [dir] // 添加指定目录到暂存区，包含子目录
or
git add . //添加当前目录的所有文件到暂存区

git add -p // 添加每个变化前，都会要求确认，对于同一个文件的多次变化，可以实现分次提交
```

> 删除工作区文件，并且将这次删除放入暂存区

```ts
git rm [files1] [files2] ...
```

> 停止追踪指定文件，但该文件会保留到工作区

```ts
git rm --cached [file]
```

#### 代码提交

> 提交暂存区文件到版本库

```ts
git commit -m "msg"
```

> 查看文件状态

```ts
git status
```

> 代码回滚
> 会改变提交记录,回到回滚的版本，该版本之后的记录删除

```ts
git reset --hard [commit-id]
```

> 从需要回滚的版本增加一份，不改变版本记录

```ts
git revert [commit-id]
```

#### 提交到远程

```ts
git push [branch-name]
```

## 场景：撤销合并

### ✅ 情况一：合并后还没提交

也就是说你只是合并了代码，但还没 git commit。

✅ 解决方法：

```bash
git merge --abort
```

这个命令会取消正在进行的合并，回到合并前的状态。

### ✅ 情况二：合并后已经提交了

如果你已经执行了 git commit，那就需要使用 git reset。

✅ 解决方法：
查看历史提交：

```bash
git log --oneline
```

找到你合并之前的那一条 commit，比如：

```sql
abc1234 原来的提交信息
def5678 Merge branch 'xxx'
```

回到那个合并前的 commit：

```bash
git reset --hard abc1234
```

⚠️ 注意：
使用 --hard 会丢弃你当前工作区的更改（包括未提交的改动），要小心操作。
如果你已经推送到远程仓库，并想撤销远程的合并，需要用 git push --force，但这要 非常小心，因为可能影响别人。

## git flow(工作流)

1. 主分支
   > 主分支是用来发布重大版本，给用户使用的版本
2. 开发分支
   > 开发者上有很多版本，是经过开发者提交，测试提测，将没有问题的版本合并到主分支上
3. 功能分支
   > 开发者对于不同的功能建立功能分支，开发完成后合并到开发分支，让测试提测
4. bug 分支 ，依据 main 分支当前有问题的版本建立一个修补 bug 分支，进行修复，修复完成后合并到开发分支，再让测试提测

图解：
![alt text](/images/git/git_flow.png)
