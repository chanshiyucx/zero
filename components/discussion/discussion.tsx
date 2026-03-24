'use client'

import {
  CaretRightIcon,
  ChatTextIcon,
  HeartStraightIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useLoading } from '@/hooks/use-loading'
import { useLocalStorage } from '@/hooks/use-local-storage'
import type { Discussion as DiscussionType } from '@/lib/api/github'
import { cn } from '@/lib/utils/style'

type DiscussionProps = {
  label: string
  title: string
  simple?: boolean
}

const LocalDiscussionKey = 'discussion'

const fetcher = async (url: string): Promise<DiscussionType | null> => {
  try {
    const res = await fetch(url, {
      cache: 'no-store',
    })
    if (!res.ok) return null

    const data = (await res.json()) as DiscussionType
    return data
  } catch {
    return null
  }
}

const extractLikeCount = (body?: string): number => {
  if (!body) return 0
  const match = /\d+/.exec(body)
  return match ? parseInt(match[0], 10) : 0
}

export function Discussion({ label, title, simple }: DiscussionProps) {
  const [loading, setLoading] = useState(false)
  const [delay, reset] = useLoading(1000)
  const [isLiked, setIsLiked] = useState(false)
  const [localData, setLocalData] = useLocalStorage<Record<string, number>>(
    LocalDiscussionKey,
    {},
  )
  const discussionKey =
    title && label
      ? `/api/discussions?${new URLSearchParams({ title, label }).toString()}`
      : null

  const { data: discussion, mutate } = useSWR<DiscussionType | null>(
    discussionKey,
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

  const resolveDiscussion = async () => {
    if (discussion !== undefined) return discussion
    return mutate()
  }

  const submitDiscussionAction = async ({
    method,
    body,
    discussionId,
  }: {
    method: 'POST' | 'PUT'
    body: string
    discussionId?: string
  }) => {
    if (loading || (method === 'PUT' && !discussionId)) return null

    setLoading(true)
    reset()

    try {
      const payload =
        method === 'POST'
          ? { title, label, body }
          : { discussionId, title, label, body }

      const response = await fetch('/api/discussions', {
        method,
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as DiscussionType
      if (data) {
        await mutate(data, false)
      }
      return data
    } catch (error) {
      console.error(
        `Failed to ${method === 'POST' ? 'create' : 'update'} discussion:`,
        error,
      )
      return null
    } finally {
      await delay()
      setLoading(false)
    }
  }

  const handleDiscuss = async () => {
    const currentDiscussion = await resolveDiscussion()

    if (!currentDiscussion) {
      const createdDiscussion = await submitDiscussionAction({
        method: 'POST',
        body: 'like: 0',
      })
      if (createdDiscussion) {
        window.open(createdDiscussion.html_url, '_blank')
      }
      return
    }

    window.open(currentDiscussion.html_url, '_blank')
  }

  const handleLike = async () => {
    if (isLiked) return
    const currentDiscussion = await resolveDiscussion()
    const currentLikeCount = extractLikeCount(currentDiscussion?.body)
    const method = currentDiscussion ? 'PUT' : 'POST'
    const newLikeCount = currentLikeCount + 1
    const bodyStr = `like: ${method === 'POST' ? 1 : newLikeCount}`

    const updatedDiscussion = await submitDiscussionAction({
      method,
      body: bodyStr,
      discussionId: currentDiscussion?.node_id,
    })

    if (updatedDiscussion) {
      setIsLiked(true)
      setLocalData({ ...localData, [title]: 1 })
    }
  }

  if (simple) {
    return (
      <div className="text-muted flex items-center gap-3">
        <button
          type="button"
          onClick={() => void handleLike()}
          className={cn(
            'flex w-10 appearance-none items-center justify-start',
            !isLiked && 'cursor-pointer',
          )}
        >
          <HeartStraightIcon
            size={16}
            weight={isLiked ? 'fill' : 'bold'}
            className={cn(isLiked ? 'text-rose' : 'text-current')}
          />
          <span className="text-sm">({like})</span>
        </button>

        <button
          type="button"
          onClick={() => void handleDiscuss()}
          className="flex w-10 cursor-pointer appearance-none items-center justify-start"
        >
          <ChatTextIcon size={16} weight="bold" />
          <span className="text-sm">({comments})</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-muted flex items-center gap-1">
        <CaretRightIcon weight="bold" className="text-sm" />
        <span className="mr-2">{isLiked ? 'Thanks!' : 'Like this post?'}</span>
        <button
          type="button"
          onClick={() => void handleLike()}
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
