/**
 * @description 自动更新
 *
 * 解决方案：
 * 1. websocket 看对实时更新要求高的场景 用户较多的情况下耗费资源
 * 2. 轮询
 *  前提是：当前页面的js文件有指纹
 *  2.1. 轮询请求当前页面html文档,在文档中找到js文件指纹
 *  2.2. 如果指纹不同，则说明有更新
 *
 */
export const useAutoUpdate = () => {
  let lastSrcs: string[] = []; // 上一次获取到的script地址列表

  const scriptReg = /<script.*src=["'](?<src>[^"']+)/gm; // 匹配script标签的正则表达式,用于读取文档中的js标签

  /**
   * @description 获取最新页面的script链接
   */

  async function extractNewScripts() {
    // 通过fetch获取当前页面的html文档 ?_timestamp= + Date.now()是为了避免缓存
    const html = await fetch("/?_timestamp=" + Date.now()).then((res) =>
      res.text()
    );
    scriptReg.lastIndex = 0; // 重置正则表达式的lastIndex属性
    const result: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = scriptReg.exec(html))) {
      const src = match?.groups?.src;
      if (src) {
        result.push(src);
      }
    }
    return result;
  }

  async function checkUpdate() {
    const newScripts = await extractNewScripts(); // 获取最新的script链接

    if (!lastSrcs.length) {
      lastSrcs = newScripts;
      return false;
    }

    /*  */
    let isUpdate = false;
    // 比较新旧script列表长度，不一致则说明有更新
    if (lastSrcs.length !== newScripts.length) {
      isUpdate = true;
    }

    // 数组长度一致，逐个比较
    for (let i = 0; i < lastSrcs.length; i++) {
      if (lastSrcs[i] !== newScripts[i]) {
        isUpdate = true;
        break;
      }
    }

    lastSrcs = newScripts; // 更新上一次的script列表
    return isUpdate;
  }

  const DURATION = 10 * 1000; // 轮询间隔时间
  const autoUpdate = () => {
    setTimeout(async () => {
      debugger;
      const willUpdate = await checkUpdate(); // 检测更新
      if (willUpdate) {
        const refresh = confirm("检测到新版本，是否刷新页面以更新内容？");
        if (refresh) {
          location.reload();
        }
      }
      autoUpdate(); // 继续轮询
    }, DURATION);
  };

  return {
    autoUpdate
  };
};
