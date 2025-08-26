import { About } from '@/components/layout/about'
import { Grid } from '@/components/layout/grid'
import { Main } from '@/components/layout/main'
import { PageLayout } from '@/components/layout/page'

export default function Page() {
  return (
    <PageLayout>
      <Main />
      <Grid />
      <About />
    </PageLayout>
  )
}
