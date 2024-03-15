'use client'

// import type { Post } from 'contentlayer/generated'
// import AOS from 'aos'
// import clsx from 'clsx'
// import { allPosts } from 'contentlayer/generated'
// import { compareDesc, format } from 'date-fns'
// import { Bookmark, Calendar, Tag } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { MouseEvent, useEffect, useRef, useState } from 'react'
// import MDX from '@/components/MDX'
import { useTheme } from '@/utils/hook'

export default function Page() {
  const [theme, , toggleTheme] = useTheme()

  return (
    <div>
      <span>{theme}</span>
      <button onClick={toggleTheme}>切换</button>
    </div>
  )
}
