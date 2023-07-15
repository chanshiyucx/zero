import React, { useState, useEffect, useRef, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActivate, useUnactivate } from 'react-activation'
import clsx from 'clsx'
import AOS from 'aos'
import { Issue, Hot } from '@/type'
import { queryArchive, queryHot } from '@utils/service'
import { formatIssue } from '@utils/format'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'
import Markdown from '@/components/Markdown'
import { Calendar, Bookmark, Tag, Eye } from '@components/Icons'
import styles from './index.module.css'

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate()
  const loading = useLoading()
  const [page, setPage] = useState(1)
  const [issues, setIssues] = useState<Issue[]>([])
  const [hot, setHot] = useState<Hot>({})
  const maskRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef<any>(null)
  const timerRef = useRef<number>()
  const loadingRef = useRef<boolean>(false)
  const finishedRef = useRef<boolean>(false)
  const unactiveRef = useRef<boolean>(false)
  const [maskHeight, setMaskHeight] = useState(0)
  const [maskTop, setMaskTop] = useState(0)

  const handleQuery = () => {
    loadingRef.current = true
    queryArchive(page)
      .then(async (data) => {
        if (page === 1) {
          await loading()
        }

        if (data.length) {
          data = data.map(formatIssue)
          setIssues([...issues, ...data])

          const ids = data.map((s) => s.id)
          queryHot(ids).then((h) => {
            setHot({ ...hot, ...h })
          })
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
      })
      .catch(console.error)
      .finally(() => {
        loadingRef.current = false
      })
  }

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const calcMaskPos = (target: any) => {
    if (!hoverRef.current) {
      hoverRef.current = target
    }
    const { clientHeight, offsetTop } = target
    const paddingTop = document.documentElement.clientWidth > 1024 ? 3 * 16 : 2 * 16
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

  const handleScrollAndResize = () => {
    if (unactiveRef.current) return
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (hoverRef.current) {
        calcMaskPos(hoverRef.current)
      }
    }, 100)
    // load more
    if (loadingRef.current || finishedRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight > scrollHeight - 100) {
      loadingRef.current = true // fix frequent loading
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease',
      debounceDelay: 50,
      throttleDelay: 100,
      offset: 0,
    })

    window.addEventListener('scroll', handleScrollAndResize, false)
    window.addEventListener('resize', handleScrollAndResize, false)
    return () => {
      window.removeEventListener('scroll', handleScrollAndResize, false)
      window.removeEventListener('resize', handleScrollAndResize, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useActivate(() => {
    hoverRef.current.scrollIntoView()
    unactiveRef.current = false
  })

  useUnactivate(() => {
    unactiveRef.current = true
  })

  return (
    <div className="page">
      {issues.length === 0 ? (
        <Loading />
      ) : (
        <div className="fade">
          <div
            ref={maskRef}
            className={clsx(
              styles.mask,
              'pointer-events-none absolute top-0 left-0 w-full lg:rounded transform transition-all ease-in-out duration-300',
            )}
            style={{
              height: `${maskHeight}px`,
              transform: `translateY(${maskTop}px)`,
            }}
          ></div>
          <div ref={listRef} className="relative space-y-4">
            {issues.map((issue) => {
              return (
                <article
                  key={issue.id}
                  className="cursor-pointer sm:px-4 py-4 overflow-x-hidden tracking-wide"
                  data-aos="fade-left"
                  onClick={() => navigate(`/post/${issue.number}`)}
                  onMouseOver={handleMask}
                  onMouseEnter={handleMask}
                >
                  <h3 className="text-xl italic mb-2">{issue.title}</h3>
                  <Markdown className={styles['home-md']} content={issue.description} />
                  <div className={clsx('flex justify-start mt-2 w-fit', styles.meta)}>
                    <Calendar className="mr-0.5" />
                    {issue.created_at}
                    <Eye className="ml-1 sm:ml-4 mr-0.5" />
                    {hot[issue.id] || 0}℃
                    <Bookmark className="ml-1 sm:ml-4 mr-0.5" />
                    {issue.milestone ? issue.milestone.title : '未分类'}
                    <Tag className="ml-1 sm:ml-4 mr-0.5" />
                    {issue.labels.map((label) => (
                      <span className="ml-1 mr-2" key={label.id}>
                        {label.name}
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
export default Home
