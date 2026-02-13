import { About, Last } from '@/components/info'
import { PageLayout } from '@/components/page'

export default function Page() {
  return (
    <PageLayout showNav={false}>
      <About />
      <Last />
    </PageLayout>
  )
}
