export default function Footer() {
  return (
    <footer className="p-2 md:px-14">
      <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-zinc-500">
        <p>Chanshiyu </p>
        <span className="font-bold">·</span>
        <p>&copy; 2016-{new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
