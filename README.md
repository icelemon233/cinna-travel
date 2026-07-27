# Cinna Travel

一份可交互的川西与拉萨完整景点图鉴，包含景点筛选、地图路线、实景图、海拔、季节与游玩建议。

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
pnpm build:pages
```

页面图片已拆分到 `public/travel-assets`，以支持浏览器懒加载。若重新导入包含 Base64 图片的单文件页面，可执行 `pnpm assets:extract` 再构建。

## 部署 GitHub Pages

```bash
pnpm deploy:pages
```

部署脚本会构建站点，并将 `dist` 目录发布到仓库的 `gh-pages` 分支。

线上地址：<https://icelemon233.github.io/cinna-travel/>
