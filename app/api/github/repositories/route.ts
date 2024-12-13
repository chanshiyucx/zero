import { NextResponse } from 'next/server'
import { getGithubRepositories } from '@/lib/request'

export const runtime = 'edge'

export async function GET() {
  const repositories = await getGithubRepositories()
  return NextResponse.json(repositories)
}

export const dynamic = 'force-dynamic'
