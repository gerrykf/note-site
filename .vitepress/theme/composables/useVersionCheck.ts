import { onMounted } from "vue";

export function useVersionCheck() {
  debugger;
  const currentVersion = __BUILD_DATE__;

  const checkVersion = async () => {
    try {
      const res = await fetch("/version.json?_t=" + Date.now(), {
        headers: { "Cache-Control": "no-cache" }
      });
      const data = await res.json();
      const remoteVersion = data.version;

      if (remoteVersion > currentVersion) {
        const refresh = confirm("检测到新版本，是否刷新页面以更新内容？");
        if (refresh) {
          location.reload();
        }
      }
    } catch (err) {
      console.warn("版本检测失败：", err);
    }
  };

  onMounted(() => {
    // 首次加载时检查版本
    checkVersion();

    setInterval(checkVersion, 10 * 1000); // 每分钟检查一次
  });
}
