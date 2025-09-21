const fs = require("fs");
const path = require("path");

const BASE_URL = "https://quicktools-hub.netlify.app"; // change if custom domain
const ROOT_DIR = "./"; // project root

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith(".html")) {
      const relativePath = path.relative(ROOT_DIR, fullPath);
      fileList.push(relativePath.replace(/\\/g, "/"));
    }
  });
  return fileList;
}

const htmlFiles = getAllHtmlFiles(ROOT_DIR);

const urls = htmlFiles.map((file) => {
  let url = file === "index.html" ? "" : file.replace("index.html", "");
  return `
  <url>
    <loc>${BASE_URL}/${url}</loc>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap, "utf8");
console.log("✅ Sitemap generated!");
