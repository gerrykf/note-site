/**
 * @description 版本检测
 */
export function useVersionCheck() {
  const currentVersion = __BUILD_DATE__;

  const checkVersion = async () => {
    try {
      const res = await fetch("/note-site/version.json", {
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

  return {
    checkVersion
  };
}
