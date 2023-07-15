/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import type { Post } from 'contentlayer/generated'
import AOS from 'aos'
import clsx from 'clsx'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { Bookmark, Calendar, Tag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import MDX from '@/components/MDX'

export default function Page() {
  const postList: Post[] = allPosts
    .filter((post) => post.category !== '一心净土' && post.category !== '真我之名')
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const maskRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef<any>(null)
  const timerRef = useRef<number>()
  const finishedRef = useRef<boolean>(false)
  const [maskHeight, setMaskHeight] = useState(0)
  const [maskTop, setMaskTop] = useState(0)
  const [anime, setAnime] = useState('fade-left')

  useEffect(() => {
    const data = postList.slice((page - 1) * 10, page * 10)
    if (data.length) {
      setPosts([...posts, ...data])
    } else {
      finishedRef.current = true
    }

    if (maskHeight === 0) {
      setTimeout(() => {
        const target = listRef.current?.firstChild
        if (target) {
          calcMaskPos(target)
        }
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const calcMaskPos = (target: any) => {
    const { clientHeight, offsetTop } = target
    const paddingTop = document.documentElement.clientWidth > 1024 ? 4 * 16 : 6 * 16
    const realTop = offsetTop + paddingTop
    if (maskHeight === clientHeight && maskTop === realTop) return
    setMaskHeight(clientHeight)
    setMaskTop(realTop)
  }

  const handleMask = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    hoverRef.current = e.currentTarget
    calcMaskPos(e.currentTarget)
  }

  const handleScroll = () => {
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (hoverRef.current) {
        calcMaskPos(hoverRef.current)
      }
      // load more
      if (finishedRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight > scrollHeight - 100) {
        setPage((page) => page + 1)
      }
    }, 100)
  }

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease',
      debounceDelay: 50,
      throttleDelay: 100,
      offset: 0,
    })
    setAnime(document.documentElement.clientWidth > 640 ? 'fade-left' : 'fade-up')

    window.addEventListener('scroll', handleScroll, false)
    return () => window.removeEventListener('scroll', handleScroll, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page px-0">
      <div
        ref={maskRef}
        className="mask pointer-events-none absolute left-0 top-0 w-full transform rounded transition-all duration-300 ease-in-out"
        style={{
          height: `${maskHeight}px`,
          transform: `translateY(${maskTop}px)`,
        }}
      ></div>
      <div ref={listRef} className="relative space-y-4">
        {posts.map((post) => {
          return (
            <article
              key={post._id}
              className="cursor-pointer p-4"
              data-aos={anime}
              onClick={() => router.push(`/posts/${post.title}`)}
              onMouseOver={handleMask}
              onMouseEnter={handleMask}
            >
              <h2 className="mb-2 text-xl italic">{post.title}</h2>
              <MDX code={post.summary.code} />
              <div className="meta mt-2 flex justify-start">
                <Calendar className="mr-1" />
                {format(new Date(post.date), 'yyyy-MM-dd')}
                <Bookmark className="ml-4 mr-1" />
                {post.category}
                <Tag className="ml-4 mr-1" />
                {post.tags.map((tag, index) => (
                  <span key={tag} className={clsx('mr-2', index >= 1 && 'hidden sm:inline-block')}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
