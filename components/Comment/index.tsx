'use client'

import Giscus from '@giscus/react'
import { FC, useLayoutEffect, useRef, useState } from 'react'

interface CommentProps {
  term: string
}

const themes = ['hutao', 'keqing', 'ganyu']

const Comment: FC<CommentProps> = ({ term }) => {
  const timerRef = useRef<number>()
  const countRef = useRef<number>(0)
  const [theme, setTheme] = useState('hutao')

  // useLayoutEffect(() => {
  //   clearInterval(timerRef.current)
  //   timerRef.current = window.setInterval(() => {
  //     const newTheme = themes[countRef.current % 3]
  //     console.log('change theme------', newTheme, countRef.current)
  //     setTheme(newTheme)
  //     countRef.current += 1
  //   }, 5000)
  // }, [])

  return (
    <Giscus
      id="comment"
      repo="chanshiyucx/comment"
      repoId="MDEwOlJlcG9zaXRvcnkxNTA5MjIwMzM="
      category="Announcements"
      categoryId="DIC_kwDOCP7jMc4CX150"
      mapping="specific"
      term={term}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={`https://zzz-peach.vercel.app/assets/styles/${theme}.css`}
      lang="zh-CN"
      loading="lazy"
    />
  )
}

export default Comment
