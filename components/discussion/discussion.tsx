'use client'

import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useLoading } from '@/hooks/use-loading'
import { useLocalStorage } from '@/hooks/use-local-storage'
import type { Discussion as DiscussionType } from '@/lib/api/github'
import { cn } from '@/lib/utils/style'

interface DiscussionProps {
  label: string
  title: string
}

const LocalDiscussionKey = 'discussion'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const extractLikeCount = (body?: string): number => {
  if (!body) return 0
  const match = /\d+/.exec(body)
  return match ? parseInt(match[0], 10) : 0
}

export function Discussion({ label, title }: DiscussionProps) {
  const [loading, setLoading] = useState(false)
  const [delay, reset] = useLoading(1000)
  const [isLiked, setIsLiked] = useState(false)
  const [localData, setLocalData] = useLocalStorage<Record<string, number>>(
    LocalDiscussionKey,
    {},
  )

  const { data: discussion, mutate } = useSWR<DiscussionType>(
    title && label ? `/api/discussions?title=${title}&label=${label}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  const like = extractLikeCount(discussion?.body)
  const comments = discussion?.comments ?? 0

  useEffect(() => {
    setIsLiked(Boolean(localData[title]))
  }, [localData, title])

  const submitDiscussionAction = async (
    method: 'POST' | 'PUT',
    body: string,
  ) => {
    if (
      loading ||
      (method === 'PUT' && !discussion) ||
      (method === 'POST' && discussion)
    )
      return

    setLoading(true)
    reset()

    try {
      const payload =
        method === 'POST'
          ? { title, label, body }
          : { discussionId: discussion?.node_id, body }

      const response = await fetch('/api/discussions', {
        method,
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as DiscussionType
      if (data) {
        void mutate({ ...discussion, ...data }, false)
      }
    } catch (error) {
      console.error(
        `Failed to ${method === 'POST' ? 'create' : 'update'} discussion:`,
        error,
      )
    }

    await delay()
    setLoading(false)
  }

  const handleDiscuss = async () => {
    if (!discussion) {
      await submitDiscussionAction('POST', 'like: 1')
    }
    if (discussion) {
      window.open(discussion.html_url, '_blank')
    }
  }

  const handleLike = () => {
    if (isLiked) return
    const method = discussion ? 'PUT' : 'POST'
    const newLikeCount = like + 1
    const bodyStr = `like: ${method === 'POST' ? 1 : newLikeCount}`

    submitDiscussionAction(method, bodyStr).catch(console.error)

    void mutate(
      discussion
        ? { ...discussion, body: bodyStr }
        : ({ body: bodyStr } as DiscussionType),
      false,
    )

    setIsLiked(true)
    setLocalData({ ...localData, [title]: 1 })
  }

  return (
    <div className="space-y-2">
      <div className="text-muted flex items-center gap-1">
        <CaretRightIcon weight="bold" className="text-sm" />
        <span className="mr-2">{isLiked ? 'Thanks!' : 'Like this post?'}</span>
        <button
          type="button"
          onClick={handleLike}
          className={cn(
            'appearance-none font-bold underline decoration-current/40 underline-offset-2',
            !isLiked && 'hover:text-rose cursor-pointer',
          )}
        >
          {isLiked ? 'Liked' : 'Sure'}. {like > 0 ? `(${like})` : ''}
        </button>
      </div>
      <div className="text-muted flex items-center gap-1">
        <CaretRightIcon weight="bold" className="text-sm" />
        Comment on
        <button
          type="button"
          onClick={() => void handleDiscuss()}
          className="hover:text-rose mx-0.5 cursor-pointer appearance-none font-bold underline decoration-current/40 underline-offset-2"
        >
          discussion. {comments > 0 ? `(${comments})` : ''}
        </button>
      </div>
    </div>
  )
}
