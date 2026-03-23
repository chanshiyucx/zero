import { sortedAlbums } from '@/lib/utils/content'

export function generateStaticParams() {
  return sortedAlbums.map((album) => ({
    slug: album.slug,
  }))
}

export { default, generateMetadata } from '@/components/article'
