import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";

// 站点基础信息
const SITE_URL = "https://gerrykf.github.io";

// 生成的 `sitemap.xml` 位置
const SITEMAP_PATH = path.resolve("./dist/sitemap.xml");

// 你的 VitePress 路由（可以手动维护）
const pages = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/guide/", changefreq: "weekly", priority: 0.9 },
  { url: "/blog/", changefreq: "weekly", priority: 0.8 },
  { url: "/about/", changefreq: "monthly", priority: 0.6 }
];

// 生成 `sitemap.xml`
async function generateSitemap() {
  console.log("🚀 正在生成 sitemap.xml...");
  const stream = new SitemapStream({ hostname: SITE_URL });

  const writeStream = createWriteStream(SITEMAP_PATH);
  stream.pipe(writeStream);

  pages.forEach((page) => stream.write(page));
  stream.end();

  await streamToPromise(stream);
  console.log("✅ sitemap.xml 生成成功！");
}

generateSitemap().catch(console.error);
