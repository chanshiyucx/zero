# ZERO 开发日志

## 技术选型

1. 前端框架 [NextJS](https://nextjs.org/)
2. 前端样式 [TailwindCSS](https://tailwindcss.com/)
3. 代码检查与格式化

   - 代码检查 [eslint](https://eslint.org/)
   - TypeScript 规则 [typescript-eslint](https://typescript-eslint.io/linting/typed-linting/)
   - 格式美化 [prettier](https://prettier.io/)

4. 代码提交

   - 钩子工具 [husky](https://typicode.github.io/husky/)
   - 暂存区校验 [lint-staged](https://github.com/okonet/lint-staged/)
   - 提交信息规范 [commitlint](https://commitlint.js.org/)

5. 站点生成

   - MarkDown 文件读取 [contentlayer](https://www.contentlayer.dev/)
   - Sitemap 生成 [next-sitemap](https://github.com/iamvishnusankar/next-sitemap/)

6. 内容解析

   - 图标库 [lucide-react](https://lucide.dev/guide/packages/lucide-react)
   - 外部链接 [rehype-external-links](https://github.com/rehypejs/rehype-external-links)
   - 代码高亮 [rehype-pretty-code](https://rehype-pretty-code.netlify.app/)
   - 辅助解析 [remarkGfm](https://github.com/remarkjs/remark-gfm)
   - 图片尺寸计算 [image-size](https://github.com/image-size/image-size)
   - SVG 图标 [svgr](https://github.com/gregberge/svgr)

7. 动画效果
   - 图片预览 [react-photo-view](https://github.com/MinJieLiu/react-photo-view)

## 提交规范

| 类型     | 描述                     |
| -------- | ------------------------ |
| feat     | 新功能                   |
| fix      | 修复                     |
| docs     | 文档变更                 |
| chore    | 构建过程或辅助工具的变动 |
| style    | 代码格式                 |
| refactor | 代码重构                 |
| ci       | 自动化相关               |
| test     | 代码测试                 |
| perf     | 性能优化                 |
| revert   | 回退                     |
| vercel   | vercel 相关              |

## 技术攻关

### 1. 图片尺寸计算

[Ability to add width and height to the image](https://github.com/remcohaszing/remark-mdx-images/issues/3)
[rehype-img-size](https://github.com/ksoichiro/rehype-img-size/blob/master/index.js)
