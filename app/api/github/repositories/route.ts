import { NextResponse } from 'next/server'
import { getGithubRepositories } from '@/lib/request'

export const runtime = 'edge'

export async function GET() {
  try {
    const repositories = await getGithubRepositories()
    return NextResponse.json(repositories)
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 },
    )
  }
}

export const dynamic = 'force-dynamic'
