import { createWriteStream, writeFileSync } from "fs";
import path from "path";

// 输出路径
const DIST_DIR = path.resolve("./dist");
const VERSION_PATH = path.resolve(DIST_DIR, "version.json");

async function generateVersion() {
  // 👉 生成版本文件，内容是当前时间戳
  const versionData = {
    version: Date.now().toString() // 或 new Date().toISOString()
  };
  writeFileSync(VERSION_PATH, JSON.stringify(versionData, null, 2));

  console.log("✅version.json 生成成功！");
}

generateVersion().catch((err) => {
  console.error("❌ 生成版本文件失败:", err);
});
