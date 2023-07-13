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
   - 访客评论 [giscus](https://giscus.app/zh-CN)

6. 内容解析

   - 图标库 [lucide-react](https://lucide.dev/guide/packages/lucide-react)
   - 外部链接 [rehype-external-links](https://github.com/rehypejs/rehype-external-links)
   - 代码高亮 [rehype-pretty-code](https://rehype-pretty-code.netlify.app/)
   - 辅助解析 [remarkGfm](https://github.com/remarkjs/remark-gfm)
   - 图片尺寸计算 [image-size](https://github.com/image-size/image-size)
   - SVG 图标 [svgr](https://github.com/gregberge/svgr)
   - 样式管理 [clsx](https://github.com/lukeed/clsx)
   - 日期处理 [date-fns](https://github.com/date-fns/date-fns)

7. 效果增强

   - 图片预览 [react-photo-view](https://github.com/MinJieLiu/react-photo-view)
   - 滚动动画 [aos](https://github.com/michalsnik/aos)
   - 颜色转换 [color](https://github.com/Qix-/color)
   - 打字机 [Typed.js](https://github.com/mattboldt/typed.js)

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

### 2. contentlayer 升级到 0.3.4 报错

问题详情：[Error when building with contentlayer 0.3.4 and Next.js 13 App Router](https://github.com/contentlayerdev/contentlayer/issues/506)

临时解决：在 `package.json` 中覆盖版本。

```json
  "overrides": {
    "@opentelemetry/api": "1.4.1",
    "@opentelemetry/core": "1.13.0",
    "@opentelemetry/exporter-trace-otlp-grpc": "0.39.1",
    "@opentelemetry/resources": "1.13.0",
    "@opentelemetry/sdk-trace-base": "1.13.0",
    "@opentelemetry/sdk-trace-node": "1.13.0",
    "@opentelemetry/semantic-conventions": "1.13.0"
  },
```
