// import type { Post } from 'content-collections'
// import { allPosts } from 'content-collections'
// import { compareDesc, format } from 'date-fns'
// import { ChevronsRight } from 'lucide-react'
// import Link from 'next/link'
// import { MDX } from '@/components/mdx'
import { Grid } from '@/components/grid'
import { Title } from '@/components/main'

export default function Page() {
  return (
    <main className="page space-y-24">
      <Title />
      <Grid />
    </main>
  )
}
