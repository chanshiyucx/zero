'use client'

import Giscus from '@giscus/react'
import { FC } from 'react'

interface CommentProps {
  term: string
}

const Comment: FC<CommentProps> = ({ term }) => {
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
      theme="light"
      lang="zh-CN"
      loading="lazy"
    />
  )
}

export default Comment
