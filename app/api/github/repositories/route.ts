import { NextResponse } from 'next/server'
import { getGithubRepositories } from '@/lib/api'

export const runtime = 'edge'

export async function GET() {
  try {
    const repositories = await getGithubRepositories()
    return NextResponse.json(repositories)
  } catch (error) {
    console.error('Failed to fetch repositories:', (error as Error)?.message)
    return NextResponse.json(null, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
