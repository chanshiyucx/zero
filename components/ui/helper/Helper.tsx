import { Polyglot } from './Polyglot'
import { ScrollTop } from './ScrollTop'

export function Helper() {
  return (
    <section className="fixed right-8 bottom-6 z-10 flex flex-col gap-3">
      <Polyglot />
      <ScrollTop />
    </section>
  )
}
