<template>
    <div>
        <h1>全部概览</h1>
        <div class="cards-grid">
            <a v-for="feature in features" :key="feature.title" :href="feature.link" class="card-link"
                :aria-label="`阅读文章：${feature.title}`">
                <div class="card">
                    <div class="card-info">
                        <h3 class="card-title">{{ feature.title }}</h3>
                        <p class="card-summary">{{ feature.details }}</p>
                    </div>

                    <template v-if="feature.icon.src">
                        <img :src="feature.icon.src" alt="icon" />
                    </template>
                    <template v-else>
                        <div class="icon">{{ feature.icon }}</div>
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
h1 {
    text-align: center;
    margin: 1rem;
    font-size: 1.5rem;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 15px;
}

.card {
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 5px;
    text-align: center;
    transition: all 0.3s;
    height: 200px;
    background-color: var(--vp-c-bg-soft);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.card img {
    width: 50px;
    height: 50px;
    margin: 0 auto;
}

.card-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--vp-c-text-1);
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

.card-link:hover .card {
    border-color: var(--vp-c-brand-1);
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: var(--vp-c-default-soft);
    width: 48px;
    height: 48px;
    font-size: 24px;
    transition: background-color 0.25s;
}
</style>