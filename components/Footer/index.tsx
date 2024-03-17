'use client'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="my-2 flex flex-wrap gap-2 p-5 text-center text-sm text-gray-500 md:my-8 md:flex-nowrap md:items-end md:justify-between md:p-3 md:text-left"
    >
      <div id="footer-left" className="w-full max-md:flex-shrink-0">
        <section className="flex items-center gap-5 max-md:justify-center">
          <a href="/">
            <div className="jsx-6abdde91a0274a44 highlighter font-mono text-xl font-extrabold leading-10">
              <span className="jsx-6abdde91a0274a44 relative">Eltrac’s</span>
            </div>
          </a>
          <p className="text-xs text-zinc-500 max-md:hidden">
            Eltrac 的个人分享
          </p>
        </section>
        <section className="mt-1">
          <p className="inline-flex gap-1 text-xs">
            <strong>站内链接：</strong>
            <a href="/links">友情链接</a> |<a href="/blog">博客归档</a> |
            <a href="/about">关于页面</a> |<a href="/feed">RSS</a>
          </p>
        </section>
        <section className="mb-3 mt-1">
          <p className="inline-flex gap-1 text-xs">
            <strong>我的作品：</strong>
            <a target="_blank" href="https://bi.guhub.cn">
              怪奇灵感生成器
            </a>
          </p>
        </section>
      </div>
    </footer>
  )
}
