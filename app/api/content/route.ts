import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { findContentBySlug } from '@/lib/utils/content'

const QuerySchema = z.object({
  slug: z.string().min(1, 'Slug cannot be empty.'),
})

export function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      slug: searchParams.get('slug'),
    }

    const { slug } = QuerySchema.parse(query)

    const content = findContentBySlug(slug)
    const meta = { title: content?.title }

    return NextResponse.json(meta)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
