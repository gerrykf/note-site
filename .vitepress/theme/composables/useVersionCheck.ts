/**
 * @description 版本检测
 *
 * 功能详解：
 * 1.在vite中构建时，__BUILD_DATE__会被替换为当前的构建时间戳。
 * 2.构建时会生成一个version.json文件，里面包含了当前版本号。
 * 3.在页面加载时，会请求version.json文件，跟当前版本号进行对比。
 * 4.如果远程版本号大于当前版本号，则弹出提示框，询问用户是否刷新页面。
 * 4.1. 如果是第一次进入网站，记录当前版本，不提示。
 * 4.2. 每次提示前都会检查localStorage中是否已经提示过这个版本，如果提示过，则不再提示。
 * 4.3. 如果用户选择刷新，记录当前版本号，并刷新页面。
 */
export function useVersionCheck() {
  const currentVersion = __BUILD_DATE__; // vitepress中构建时会替换为当前的构建时间戳 viet配置中的变量

  const checkVersion = async () => {
    try {
      const res = await fetch("/note-site/version.json", {
        headers: { "Cache-Control": "no-cache" }
      });
      const data = await res.json();
      const remoteVersion = data.version;
      const lastPromptedVersion = localStorage.getItem("lastPromptedVersion");
      const lastSeenVersion = localStorage.getItem("lastSeenVersion"); // 第一次进入网站没有版本记录

      // ✅ 如果是第一次进入网站，记录当前版本，不提示
      if (!lastSeenVersion) {
        localStorage.setItem("lastSeenVersion", currentVersion);
        return;
      }

      const isNewVersion = Number(remoteVersion) > Number(currentVersion);

      // 如果远程版本号大于当前版本号，并且没有提示过，则弹出提示框
      if (isNewVersion && lastPromptedVersion !== remoteVersion) {
        // 记录当前已提示过这个版本
        localStorage.setItem("lastPromptedVersion", remoteVersion);

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
