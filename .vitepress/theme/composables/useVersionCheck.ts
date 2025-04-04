/**
 * @description 版本检测
 *
 * 功能详解：
 * 1.在vite中构建时，__BUILD_DATE__会被替换为当前的构建时间戳。
 * 2.构建时会生成一个version.json文件，里面包含了当前版本号。
 * 3.在页面加载时，会请求version.json文件，跟当前版本号进行对比。
 * 4.如果远程版本号大于当前版本号，则弹出提示框，询问用户是否刷新页面。
 * 4.1. 如果用户选择刷新，则刷新页面。
 * 4.2. 刷新时增加一个标志，避免重复提示。
 * 4.3. 刷新后清除标志。
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
      const lastPromptedVersion = localStorage.getItem("lastPromptedVersion");

      const isNewVersion = Number(remoteVersion) > Number(currentVersion);

      // 如果远程版本号大于当前版本号，并且没有提示过，则弹出提示框
      if (isNewVersion && lastPromptedVersion !== remoteVersion) {
        localStorage.setItem("hasPrompted", "true"); // 设置标志，避免重复提示

        const refresh = confirm("检测到新版本，是否刷新页面以更新内容？");
        if (refresh) {
          location.reload();
          localStorage.removeItem("hasPrompted"); // 刷新后清除标志
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
