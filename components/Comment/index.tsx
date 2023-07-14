'use client'

import Giscus from '@giscus/react'
import { FC, useContext } from 'react'
import { ThemeContext } from '@/app/context'

interface CommentProps {
  term: string
}

const Comment: FC<CommentProps> = ({ term }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <Giscus
      id="comment"
      repo="chanshiyucx/comment"
      repoId="MDEwOlJlcG9zaXRvcnkxNTA5MjIwMzM="
      category="Announcements"
      categoryId="DIC_kwDOCP7jMc4CX150"
      mapping="specific"
      term={term}
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="top"
      theme={`https://zzz-peach.vercel.app/assets/styles/${theme.toLowerCase()}.css`}
      lang="zh-CN"
      loading="lazy"
    />
  )
}

export default Comment
