---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "前端笔记官网"
  image: /logo.png
  alt: gerry
  text: "前端的笔记官网 记录学习各个栈的过程与心得"
  tagline: 一起探索前端的无线可能
  actions:
    - theme: brand
      text: 全部概览
      link: /latest
    - theme: alt
      text: 前端
      link: /frontend/vue/guide
    - theme: alt
      text: 后端
      link: /backend/nodejs/nodejs

    # - theme: alt
    #   text: 项目
    #   link: /project/tongchehaofang-ERP

features:
  - icon:
      src: /icon_html&css.svg
    title: HTML+CSS
    details: HTML 是用来描述网页的一种语言, CSS 是用来控制网页样式的一种语言。
    link: /frontend/html/文档声明

  - icon:
      src: /icon_js.svg
    title: JavaScript
    details: JavaScript 是一种轻量级的解释型编程语言。
    link: /frontend/js/guide/环境准备

  - icon:
      src: /icon_ts.svg
    title: TypeScript
    details: TypeScript 是 JavaScript 的一个超集，支持类型。
    link: /frontend/ts/guide/安装与运行

  - icon:
      src: /icon_vue.svg
    title: Vue.js
    details: 轻松建构响应式界面，Vue.js是你的前端开发新选择。
    link: /frontend/vue/guide

  - icon:
      src: /icon_react.svg
    title: React.js
    details: 用于构建用户界面的 JavaScript 库。
    link: /frontend/react/guide

  - icon:
      src: /icon_nodejs.svg
    title: Nodejs
    details: Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
    link: /backend/nodejs/nodejs

  - icon:
      src: /icon_docker.svg
    title: Docker
    details: Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。
    link: /stack/docker/guide

  - icon:
      src: /icon_git.svg
    title: Git
    details: Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
    link: /frontend/git/guide

  - icon:
      src: /icon_pinia.svg
    title: Pinia
    details: Pinia 是一个为 Vue 3 设计的状态管理库。
    link: /frontend/pinia/guide

  - icon:
      src: /icon_ai.svg
    title: AI大模型
    details: AI大模型汇总
    link: /ai/install-deepseek

  - icon: 📓
    title: 面试题
    details: 30k+ 前端面试题汇总
    link: /interview-fq/vue
---
