import { About } from '@/components/layout/about'
import { Grid } from '@/components/layout/grid'
import { Main } from '@/components/layout/main'
import { StaggeredFadeInContainer } from '@/components/ui/stagger'

export default function Page() {
  return (
    <StaggeredFadeInContainer as="main" className="page">
      <Main />
      <Grid />
      <About />
    </StaggeredFadeInContainer>
  )
}
