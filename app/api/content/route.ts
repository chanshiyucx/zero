import { NextResponse } from 'next/server'
import { findContentBySlug } from '@/lib/utils/content'

export const revalidate = false

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams
    const slug = searchParams.get('slug')
    if (!slug) {
      throw new Error('Slug cannot be empty.')
    }
    const content = findContentBySlug(slug)
    const meta = { title: content?.title }
    return NextResponse.json(meta)
  } catch (error) {
    console.error(
      'Failed to fetch content meta by slug:',
      (error as Error)?.message,
    )
    return NextResponse.json(null, { status: 500 })
  }
}
