import { About } from '@/components/layout/about'
import { Grid } from '@/components/layout/grid'
import { Title } from '@/components/layout/main'

export default function Page() {
  return (
    <main className="page space-y-20 pt-16">
      <Title />
      <Grid />
      <About />
    </main>
  )
}
