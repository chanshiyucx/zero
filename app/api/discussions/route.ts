import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import {
  createDiscussion,
  getDiscussion,
  updateDiscussion,
} from '@/lib/api/github'

const GetSchema = z.object({
  title: z.string(),
  label: z.string(),
})

const CreateSchema = z.object({
  title: z.string().min(1),
  label: z.string().min(1),
  body: z.string().min(1),
})

const UpdateSchema = z.object({
  discussionId: z.string().min(1),
  title: z.string().min(1),
  label: z.string().min(1),
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
    const discussion = await getDiscussion(title, label)
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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const json: unknown = await request.json()
    const { discussionId, title, label, body } = UpdateSchema.parse(json)

    const discussion = await updateDiscussion(discussionId, title, label, body)
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
