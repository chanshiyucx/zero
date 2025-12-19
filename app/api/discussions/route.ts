import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import {
  createDiscussion,
  getDiscussions,
  updateDiscussion,
} from '@/lib/api/github'

export const runtime = 'edge'

export const dynamic = 'force-dynamic'

const GetSchema = z.object({
  title: z.string().optional(),
  label: z.string().optional(),
})

const CreateSchema = z.object({
  title: z.string().min(1),
  label: z.string().min(1),
  body: z.string().min(1),
})

const UpdateSchema = z.object({
  discussionId: z.string().min(1),
  body: z.string().min(1),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      title: searchParams.get('title'),
      label: searchParams.get('label'),
    }

    const { title, label } = GetSchema.parse(query)

    const discussions = await getDiscussions()
    const discussion = discussions.find(
      (d) => d.title === title && d.labels.some((l) => l.name === label),
    )
    return NextResponse.json(discussion)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const json: unknown = await request.json()
    const { title, label, body } = CreateSchema.parse(json)

    const discussion = await createDiscussion(title, label, body)
    return NextResponse.json(discussion)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const json: unknown = await request.json()
    const { discussionId, body } = UpdateSchema.parse(json)

    const discussion = await updateDiscussion(discussionId, body)
    return NextResponse.json(discussion)
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
