import { NextResponse } from 'next/server'
import {
  createDiscussion,
  getDiscussions,
  updateDiscussion,
} from '@/lib/api/github'

export const runtime = 'edge'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams
    const title = searchParams.get('title')
    const label = searchParams.get('label')
    const discussions = await getDiscussions()
    const discussion = discussions.find(
      (d) => d.title === title && d.labels.some((l) => l.name === label),
    )
    return NextResponse.json(discussion)
  } catch (error) {
    console.error('Failed to fetch discussions:', (error as Error)?.message)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, label, body } = await request.json()
    const discussion = await createDiscussion(title, label, body)
    return NextResponse.json(discussion)
  } catch (error) {
    console.error('Failed to create discussion:', (error as Error)?.message)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { discussionId, body } = await request.json()
    const discussion = await updateDiscussion(discussionId, body)
    return NextResponse.json(discussion)
  } catch (error) {
    console.error('Failed to update discussion:', (error as Error)?.message)
    return NextResponse.json(null, { status: 500 })
  }
}
