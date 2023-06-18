import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Chanshiyu's Blog!!!`,
}

export default function Page() {
  return (
    <>
      <div className="px-3 pb-6 pt-10 ">
        <h1 className={`flex flex-col text-3xl leading-normal tracking-wider text-black`}>博客 / Blog</h1>
      </div>
    </>
  )
}
