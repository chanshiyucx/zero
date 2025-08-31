import { About } from '@/components/layout/about'
import { Grid } from '@/components/layout/grid'
import { PageLayout } from '@/components/layout/page'

export default function Page() {
  return (
    <PageLayout>
      <About />
      <Grid />
    </PageLayout>
  )
}
