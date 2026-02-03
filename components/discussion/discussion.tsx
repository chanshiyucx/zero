'use client'

import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/use-loading'
import { useLocalStorage } from '@/hooks/use-local-storage'
import type { Discussion as DiscussionType } from '@/lib/api/github'
import { cn } from '@/lib/utils/style'

interface DiscussionProps {
  label: string
  title: string
}

const LocalDiscussionKey = 'discussion'

export function Discussion({ label, title }: DiscussionProps) {
  const [discussion, setDiscussions] = useState<DiscussionType>()
  const [loading, setLoading] = useState(false)
  const [delay, reset] = useLoading(1000)
  const [like, setLike] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [localData, setLocalData] = useLocalStorage<Record<string, number>>(
    LocalDiscussionKey,
    {},
  )

  useEffect(() => {
    setIsLiked(Boolean(localData[title]))
  }, [localData, title])

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        if (!title || !label) return
        const response = await fetch(
          `/api/discussions?title=${title}&label=${label}`,
        )
        const data = (await response.json()) as DiscussionType
        if (data) {
          setDiscussions(data)

          const match = /\d+/.exec(data.body)
          if (!match) return
          setLike(parseInt(match[0], 10))
        }
      } catch (error) {
        console.error('Failed to load discussions:', error)
      }
    }

    fetchDiscussion().catch(console.error)
  }, [label, title])

  const createDiscussion = async () => {
    try {
      if (loading || discussion) return
      setLoading(true)
      reset()
      const response = await fetch('/api/discussions', {
        method: 'POST',
        body: JSON.stringify({ title, label, body: 'like: 1' }),
      })
      const data = (await response.json()) as DiscussionType
      if (data) {
        setDiscussions(data)
      }
    } catch (error) {
      console.error('Failed to create discussion:', error)
    } finally {
      await delay()
      setLoading(false)
    }
  }

  const updateDiscussion = async () => {
    try {
      if (loading || !discussion) return
      setLoading(true)
      reset()
      const response = await fetch('/api/discussions', {
        method: 'PUT',
        body: JSON.stringify({
          discussionId: discussion.node_id,
          body: `like: ${like + 1}`,
        }),
      })
      const data = (await response.json()) as DiscussionType
      if (data) {
        setDiscussions({ ...discussion, ...data })
      }
    } catch (error) {
      console.error('Failed to create discussion:', error)
    } finally {
      await delay()
      setLoading(false)
    }
  }

  const openDiscussion = () => {
    if (!discussion) return
    window.open(discussion.html_url, '_blank')
  }

  const handleDiscuss = async () => {
    if (!discussion) {
      await createDiscussion()
    }
    openDiscussion()
  }

  const handleLike = () => {
    if (isLiked) return
    if (discussion) {
      updateDiscussion().catch(console.error)
    } else {
      createDiscussion().catch(console.error)
    }
    setLike((v) => v + 1)
    setIsLiked(true)
    setLocalData({ ...localData, [title]: 1 })
  }

  const comments = discussion?.comments ?? 0

  return (
    <div className="space-y-2">
      <div className="text-muted flex items-center gap-1">
        <CaretRightIcon weight="bold" className="text-sm" />
        <span className="mr-2">{isLiked ? 'Thanks!' : 'Like this post?'}</span>
        <span
          onClick={handleLike}
          className={cn(
            'font-bold underline decoration-current/40 underline-offset-2',
            !isLiked && 'hover:text-rose cursor-pointer',
          )}
        >
          {isLiked ? 'Liked' : 'Sure'}. {like > 0 ? `(${like})` : ''}
        </span>
      </div>
      <div className="text-muted flex items-center gap-1">
        <CaretRightIcon weight="bold" className="text-sm" />
        Comment on
        <span
          onClick={() => void handleDiscuss()}
          className="hover:text-rose mx-0.5 cursor-pointer font-bold underline decoration-current/40 underline-offset-2"
        >
          discussion. {comments > 0 ? `(${comments})` : ''}
        </span>
      </div>
    </div>
  )
}
