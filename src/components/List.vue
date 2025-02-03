<!-- 
features:
  - icon: 📓
    title: 面试题
    details: 30k+ 前端面试题汇总
    link: /interview-fq/vue
  - icon:
      src: /icon_vue.svg
    title: Vue.js
    details: 轻松建构响应式界面，Vue.js是你的前端开发新选择。
    link: /frontend/vue/vue
  - icon:
      src: /icon_react.svg
    title: React.js
    details: 用于构建用户界面的 JavaScript 库。
    link: /frontend/react/guide
  - icon:
      src: /icon_git.svg
    title: Git
    details: Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
    link: /frontend/git/deploy 
-->


<!-- 
模板示例： 要求是display: grid; 响应式布局
<div class="cards-grid">

循环下面的元素
<a data-v-1d1fece1="" href="/ai/install-deepseek" class="card-link" aria-label="阅读文章：本地部署 deepseek"><div data-v-1d1fece1="" class="card"><h3 data-v-1d1fece1="" class="card-title">本地部署 deepseek</h3><p data-v-1d1fece1="" class="card-date">2025/2/1 22:47</p><p data-v-1d1fece1="" class="card-summary">- 显卡：RTX4090</p></div></a>
</div>
-->

<template>

    <div>
        <h2>前端技术栈</h2>
        <div class="cards-grid">
            <a v-for="feature in features" :key="feature.title" :href="feature.link" class="card-link"
                :aria-label="`阅读文章：${feature.title}`">
                <div class="card">
                    <h3 class="card-title">{{ feature.title }}</h3>
                    <p class="card-summary">{{ feature.details }}</p>

                    <template v-if="feature.icon.src">
                        <img :src="feature.icon.src" alt="icon" />
                    </template>
                    <template v-else>
                        <span>{{ feature.icon }}</span>
                    </template>

                </div>
            </a>
        </div>

    </div>

</template>

<script setup>

import { ref } from 'vue'

const features = ref([
    {
        icon: '📓',
        title: '面试题',
        details: '30k+ 前端面试题汇总',
        link: './interview-fq/vue'
    },
    {
        icon: {
            src: './icon_vue.svg'
        },
        title: 'Vue.js',
        details: '轻松建构响应式界面，Vue.js是你的前端开发新选择。',
        link: './frontend/vue/vue'
    },
    {
        icon: {
            src: './icon_react.svg'
        },
        title: 'React.js',
        details: '用于构建用户界面的 JavaScript 库。',
        link: './frontend/react/guide'
    },
    {
        icon: {
            src: './icon_git.svg'
        },
        title: 'Git',
        details: 'Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。',
        link: './frontend/git/deploy'
    }
])

</script>

<style scoped>
.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
}

.card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    transition: all 0.3s;
    height: 250px;
}

.card img {
    width: 50px;
    height: 50px;
    margin: 0 auto;
}

.card-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.card-summary {
    color: #666;
    margin-bottom: 0.5rem;
}

.card-link {
    text-decoration: none;
    color: #333;
}

.card-link:hover {
    text-decoration: underline;
}
</style>