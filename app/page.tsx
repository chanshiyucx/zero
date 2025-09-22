import {
  About,
  Album,
  Article,
  Journal,
  Project,
  Snippet,
} from '@/components/layout/info'
import { PageLayout } from '@/components/layout/page'

export default function Page() {
  return (
    <PageLayout>
      <About />
      <div
        className="slide-auto space-y-12"
        style={{ '--enter-start': '300ms' }}
      >
        <Album />
        <Journal />
        <Article />
        <Snippet />
        <Project />
      </div>
    </PageLayout>
  )
}
