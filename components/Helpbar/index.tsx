import ThemeSwitcher from './theme-switcher'

export default function Helpbar() {
  return (
    <section className="z-20 md:fixed md:bottom-8 md:right-8">
      <ThemeSwitcher />
    </section>
  )
}
