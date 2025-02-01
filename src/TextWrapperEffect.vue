<template>
  <div v-show="text" class="content">
    <div class="text" :class="{ isExpanded }">
      <label class="btn" @click="expandText" v-if="!isExpanded && showExpanded"
        >展开</label
      >
      <span>
        {{ text }}
        <label class="btn" @click="expandText" v-if="isExpanded && showExpanded"
          >收起</label
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  text: { type: String, default: "" }, // 显示的文案
  defaultExpanded: { type: Boolean, default: false }, // 默认展开、或者收起
  showExpanded: { type: Boolean, default: true }, // 是否开启展开或者收起功能
});

const isExpanded = ref(props.defaultExpanded);

const expandText = () => {
  isExpanded.value = !isExpanded.value;
};

defineExpose({ isExpanded, expandText });
</script>

<style scoped>
.content {
  display: flex;
}

.content .text {
  word-break: break-all;
}
.content .text::before {
  content: "";
  float: right;
  height: 100%;
  margin-bottom: -1.5em;
}

.content .text:not(.isExpanded) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: var(--custom-line-clamp, 3);
  -webkit-box-orient: vertical;
}

.content .text:not(.isExpanded) .btn {
  float: right;
  clear: both;
  margin-right: 8px;
  cursor: pointer;
}

.content .text .btn {
  color: dodgerblue;
}
</style>