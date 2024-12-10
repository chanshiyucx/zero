export function Footer() {
  return (
    <footer className="my-3 flex items-center justify-center gap-3 text-sm">
      <p>Chanshiyu </p>
      <p>
        <span className="inline-block translate-y-0.5">&copy; </span>
        2016-{new Date().getFullYear()}
      </p>
    </footer>
  )
}
