# HARE 的博客

纯静态博客,不需要任何构建工具,托管在 GitHub Pages 上。

🔗 **线上地址**:https://hare-athena-iii.github.io

## 文件结构

```
├── index.html          首页(文章列表)
├── posts/              文章目录
│   ├── template.html   ✍️ 文章模板(写新文章时复制它)
│   └── 日期-标题.html   各篇文章
├── assets/             文章里用到的图片
├── blog.html           旧地址 → 自动跳回首页(保留兼容)
├── style.css           全站样式(主题色在顶部 :root 变量里改)
├── script.js           交互脚本(主题切换 / 动效)
└── .nojekyll           让 GitHub Pages 按纯静态文件服务
```

## 本地预览

直接双击 `index.html` 即可;或者起一个本地服务器(推荐,路径行为和线上一致):

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## ✍️ 如何发布新文章

1. 复制 `posts/template.html`,重命名为 `日期-英文短标题.html`(如 `2026-09-15-my-post.html`);
2. 打开文件,按注释修改 ① 标题、② 日期和导语、③ 正文;
3. 在 `index.html` 的文章列表里为它加一个条目(最新的放最上面);
4. 提交并推送,约 1 分钟后线上自动更新:

```bash
git add .
git commit -m "发布新文章:文章标题"
git push
```

## 自定义

- **名字**:搜索各文件中的「HARE」,替换成你自己的;
- **主题色**:改 `style.css` 顶部的 `--primary`、`--primary-2` 等变量;
- **新样式**:文章页的排版样式在 `style.css` 的 `.article` 一带。
