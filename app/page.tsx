import { About } from '@/components/layout/about'
import { Grid } from '@/components/layout/grid'
import { Title } from '@/components/layout/main'

export default function Page() {
  return (
    <main className="page">
      <Title />
      <Grid />
      <About />
    </main>
  )
}
