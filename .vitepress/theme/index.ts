import DefaultTheme from "vitepress/theme";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";
import "medium-zoom/dist/style.css";
import "./index.css";

export default {
  ...DefaultTheme,
  setup() {
    onMounted(() => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    });
  }
};
