import {
  About,
  Album,
  Article,
  Journal,
  Snippet,
} from '@/components/layout/info'
import { PageLayout } from '@/components/layout/page'

export default function Page() {
  return (
    <PageLayout>
      <About />
      <div
        className="slide-auto space-y-12"
        style={{ '--enter-start': '200ms' }}
      >
        <Journal />
        <Article />
        <Album />
        <Snippet />
      </div>
    </PageLayout>
  )
}
