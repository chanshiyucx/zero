'use client'

import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/use-loading'
import type { Discussion as DiscussionType } from '@/lib/api/github'
import type { ContentType } from '@/lib/utils/content'

interface DiscussionProps {
  label: ContentType
  title: string
}

export function Discussion({ label, title }: DiscussionProps) {
  const [discussion, setDiscussions] = useState<DiscussionType>()
  const [loading, setLoading] = useState(false)
  const [delay, reset] = useLoading(1000)

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        if (!title || !label) return
        const response = await fetch(
          `/api/discussions?title=${title}&label=${label}`,
        )
        const data: DiscussionType = await response.json()
        if (data) {
          setDiscussions(data)
        }
      } catch (error) {
        console.error('Failed to load discussions:', error)
      }
    }

    fetchDiscussion()
  }, [label, title])

  const createDiscussion = async () => {
    try {
      if (loading || discussion) return
      setLoading(true)
      reset()
      const response = await fetch('/api/discussions', {
        method: 'POST',
        body: JSON.stringify({ title, label }),
      })
      const data: DiscussionType = await response.json()
      if (data) {
        setDiscussions(data)
        window.open(data.html_url, '_blank')
      }
    } catch (error) {
      console.error('Failed to create discussion:', error)
    } finally {
      await delay()
      setLoading(false)
    }
  }

  const discuss = () => {
    if (discussion) {
      window.open(discussion.html_url, '_blank')
    } else {
      createDiscussion()
    }
  }

  const comments = discussion?.comments ?? 0
  const commentText =
    comments > 0 ? `(${comments} comment${comments > 1 ? 's' : ''})` : ''

  return (
    <div className="text-muted flex items-center justify-start gap-1">
      <CaretRightIcon weight="bold" className="text-sm" />
      comment on
      <span
        onClick={discuss}
        className="decoration-muted/40 mx-0.5 cursor-pointer font-mono font-bold underline underline-offset-4"
      >
        discussions
      </span>
      {commentText}
    </div>
  )
}
