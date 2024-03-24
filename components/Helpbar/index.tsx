import ScrollTop from './scroll-top'
import ThemeSwitcher from './theme-switcher'

export default function Helpbar() {
  return (
    <section className="z-10 flex flex-col gap-2 md:fixed md:bottom-8 md:right-8">
      <ScrollTop />
      <ThemeSwitcher />
    </section>
  )
}
