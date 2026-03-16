import Image from 'next/image'

export function Footer() {
  return (
    <footer className="mt-auto mb-8 flex justify-center gap-1 text-sm">
      <Image src="/icon.svg" alt="Shiyu" width={16} height={16} />
      <p>
        Shiyu
        <span className="ml-1 inline-block translate-y-0.5">&copy; </span>
        2016-2026
      </p>
    </footer>
  )
}
