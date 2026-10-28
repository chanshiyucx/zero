# 文章页动效优化

目标：让文章页的进入、阅读、跳转更顺滑。去掉会让读者"等内容"或看到残影的动效，同时照顾开启「减少动态效果」的用户。

## 1. 共享标题过渡只命名一个元素

**现状**：路由过渡期间，`html[data-route-transition] .article-title-transition` 会给页面上**所有**标题设置 `view-transition-name`。列表页有 N 篇文章，就会生成 N 个快照；没有匹配上的标题会单独淡出 250ms，而页面其余部分（root 设了 `animation: none`）是瞬间切换的，于是留下残影。另外，名字由 slug 经正则替换得到，中文 slug 会全部变成 `-`，可能出现重名，导致整个过渡被浏览器中止。

**方案**：

- 标题元素只标记自己的 slug：`data-title-transition={slug}`，不再用 CSS 变量和类名。
- 发起跳转时，把目标 slug 写进 `html[data-route-transition]`。
- `syncSharedTitle()` 只给**视口内**、slug 匹配的那个标题设置固定名字 `article-title`。调用时机有三个：截取旧快照前（onStart）、新 DOM 提交后（resolve 之前）、过渡结束后（清除）。
- 名字固定，就不需要再对 slug 转义，也不会重名；视口外的目标直接淡出，不会出现标题飞出屏幕的情况。

**文件**：`app/provider/route-view-transition-provider.tsx`、`components/list/article-title-transition-link.tsx`、`components/article/article.tsx`、`styles/base.css`、`lib/utils/dom.ts`

## 2. 正文错开动画按时长封顶

**现状**：`[data-slide-auto] > *` 每个子元素延迟 100ms，上限是第 20 个，再加 0.8s 动画，最后一块要约 2.8s 才出现。带锚点打开、刷新后恢复滚动位置、或快速往下滑时，会先看到空白。

**方案**：延迟改为按时间封顶：`min(stagger × --enter-delay, --enter-max-delay)`，默认 `800ms`，约等于首屏能放下的块数。封顶后，所有内容最晚约 1.6s 出现；首屏的级联效果不变。

**文件**：`styles/utilities.css`

## 3. 尊重「减少动态效果」

**现状**：只有 View Transition 判断了 `prefers-reduced-motion`；入场动画、平滑滚动、图片缩放都没有判断。

**方案**：

- `slide-container` 下的入场动画加 `motion-reduce` 关闭。
- `:root` 的 `scroll-smooth` 改为 `motion-safe:scroll-smooth`。回到顶部和 TOC 自动滚动不再在 JS 里写死 `behavior: 'smooth'`，交给 CSS 的 `scroll-behavior` 决定。
- `MotionProvider` 加 `MotionConfig reducedMotion="user"`，图片缩放的位移动画跟随系统设置。

**文件**：`styles/base.css`、`styles/utilities.css`、`components/toc/toc.tsx`、`components/helper/scroll-top.tsx`、`app/provider/motion-provider.tsx`

## 4. 标题 morph 的时长、曲线和快照

**现状**：使用浏览器默认的 250ms。h1 是块级元素，宽度占满整行，而列表链接只有文字宽度，所以缩放时旧快照会被放大得比新标题还大。点击时链接处于 hover 状态，下划线和右上角的 `┓` 也被截进了快照。

**方案**：

- `::view-transition-group(article-title)` 设为 400ms、`cubic-bezier(0.2, 0, 0, 1)`（先快后慢）。
- 文章 h1 加 `w-fit`，让两端快照的宽度都等于文字宽度，按比例缩放。
- 过渡期间 `.link-hover` 关掉过渡并回到静止样式，保证截到的是干净的标题。

**文件**：`styles/base.css`、`styles/utilities.css`、`components/article/article.tsx`

## 5. 返回链接也走共享标题过渡

**现状**：只有「列表 → 文章」有过渡，左上角的返回链接是普通跳转。

**方案**：`Article` 通过 `PageLayout` 的 `sharedTitle` 把 slug 显式传给返回链接，链接调用同一个 `navigate(href, slug)`，h1 会 morph 回列表中对应的标题（目标在视口内时才会 morph）。不从 URL 推断页面类型，新增的两段式路由不会被误判。

**不在范围**：浏览器前进/后退由 Next 的 popstate 处理，`startViewTransition` 来不及在 DOM 更新前截取旧快照，因此保持无过渡。

**文件**：`components/page/nav.tsx`、`components/page/page.tsx`、`components/article/article.tsx`

## 6. 标题下的信息行加入入场序列

**现状**：日期和阅读时长没有动画，正文滑入时它直接出现。

**方案**：信息行加 `data-slide`（第 0 位），正文从第 1 位开始，TOC 保持第 2 位。h1 本身**不加**入场动画，否则过渡的新快照会截到透明的标题。

**文件**：`components/article/article.tsx`

## 7. TOC 每帧跟随滚动

**现状**：滚动监听 throttle 100ms，再加 rAF，再加 300ms 过渡，高亮会慢半拍；进度百分比每次都用 `setState`，导致整个 TOC 重新渲染。另外，rAF 回调提前 return 时不会重置 `isSyncScheduled`，之后就再也不会同步。

**方案**：

- 去掉 throttle，直接用 rAF 合并同一帧内的滚动事件。
- 进度通过 ref 直接写 `textContent`，用 `clamp` 计算。写入放在本帧所有布局读取之后，且只在整数百分比变化时写入，避免强制同步布局。
- 进入 rAF 回调时立即重置调度标记。
- 只在当前章节变化时才把 TOC 滚动到当前项。去掉 throttle 后若每帧都调用平滑 `scrollTo`，会不断重启滚动动画，还会和读者手动滚动 TOC 抢位置。
- 路径和条目的过渡缩短到 200ms。

**文件**：`components/toc/toc.tsx`

## 8. 缩短路由过渡的保底超时

**现状**：过渡等待新路由提交，期间页面停在旧快照上、不能交互；保底超时是 3s。

**方案**：

- 超时改为 1s。超时后旧快照照常结束，新页面到达时直接替换。
- 过渡还没结束时再次点击链接，不再新开一个过渡，而是把同一次导航（`PendingNavigation`，包含 href 和对应的 `ViewTransition`）改指向新地址。之前第二次点击会覆盖 resolver 和定时器：第一个过渡永远不 resolve，残留的定时器还会提前结束第二个过渡。
- 改换目标时调用 `skipTransition()` 放弃 morph：旧快照可能已经截到了第一篇的标题，新页面没有与之匹配的标题，继续播放只会让错误的标题淡出。页面会立即恢复可交互，新路由到达后直接替换。按规范，跳过会让 `ready` 拒绝且不会标记为已处理，因此 `transitionViewIfSupported` 统一吞掉这个预期的拒绝；更新回调本身的失败仍会通过 `finished` 抛出。

**文件**：`app/provider/route-view-transition-provider.tsx`、`lib/utils/dom.ts`

## 9. 返回列表时只让标题动

**现状**：返回列表时，标题飞回原位只要 400ms，其余标题却要按错开动画依次渐入，最后一个约 1.6s 才结束，两套动效同时进行、互相争夺注意力。落点所在行的日期又没有动画，和相邻行不一致。另外，列表是读者刚看过的内容，每次返回都重播"首次进入"的级联只是噪音。还有一点：开启了 `cacheComponents` 后，Next 会把离开的页面保存在 `<Activity>` 中，返回时复用同一份 DOM，所以任何留在 DOM 上的标记都不会自动消失。

**方案**：

- 目标标题落在入场序列里（`[data-slide]` 或 `[data-slide-auto] > *`）时，说明是回到列表：立即 `finish()` 这一页所有 `slide-enter` 动画，整页一次就位，只让标题移动。通过 Web Animations API 结束动画，不在 DOM 上留标记，页面之后再次显示时入场动画照常重播。
- "回到列表"和"做共享过渡"分开判断：只要目标标题已渲染（`checkVisibility()`，排除被路由保存而隐藏的页面）就整页就位；标题还在视口内时才参与 morph。目标在屏幕外时（例如手机上的长列表），没有 morph，列表同样随整页淡入，不会重播级联。
- 文章的 h1 不在入场序列里，因此进入文章时正文照常依次展开。
- 路由过渡时，新页面用 250ms 淡入覆盖旧页面，取代原来的瞬间切换；做法和主题切换一致，新根快照盖在静止的旧根快照之上，不使用 `plus-lighter` 混合，避免中途变暗或过亮。
- 首次进入列表、或没有标题 morph 的跳转，保留完整的级联。

**不在范围**：浏览器自带的后退按钮不经过 View Transition，Next 直接显示保存的页面，级联仍会完整播放。

**文件**：`app/provider/route-view-transition-provider.tsx`、`styles/base.css`、`styles/theme.css`

## 验证

- 列表 → 文章：过渡期间只有 `::view-transition-group(article-title)` 一个标题 group，时长 400ms。
- 文章 → 返回链接 → 列表：标题 morph 回对应条目，列表其余内容不再级联，随整页一起淡入。
- 文章正文最大 `animation-delay` 为 0.8s；信息行与正文依次进入。
- TOC 高亮和百分比随滚动逐帧更新。
- `pnpm check` 通过。
