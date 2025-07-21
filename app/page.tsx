import { About } from '@/components/layout/about'
import { Grid } from '@/components/layout/grid'
import { Main } from '@/components/layout/main'

export default function Page() {
  return (
    <main className="page">
      <Main />
      <Grid />
      <About />
    </main>
  )
}
