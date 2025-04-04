import DefaultTheme from "vitepress/theme";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";

import "./index.css";
import { useVersionCheck } from "./composables/useVersionCheck";

const { checkVersion } = useVersionCheck();

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      //mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' })
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();

      setInterval(checkVersion, 10 * 1000); // 每分钟检查一次
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  }
};
