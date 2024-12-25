'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Cat } from '@/components/icons'
import { random } from '@/lib/utils/helper'

export function Meow() {
  const catRef = useRef<HTMLDivElement>(null)
  const { push } = useRouter()

  useEffect(() => {
    const pupils = catRef.current?.getElementsByClassName('pupil') || []

    const handleMouseMove = (event: MouseEvent) => {
      const x = `${(event.clientX * 6) / window.innerWidth}%`
      const y = `${(event.clientY * 8) / window.innerHeight}%`

      for (let i = 0; i < pupils.length; i++) {
        const pupil = pupils[i] as HTMLElement
        pupil.style.left = x
        pupil.style.top = y
        pupil.style.transform = `translate(${x}, ${y})`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleClick = () => {
    const to = ['/blog', '/blog/notes', '/leetcode']
    const randomPath = to[random(0, to.length - 1)]
    push(randomPath)
  }

  return (
    <div
      ref={catRef}
      onClick={handleClick}
      className="group relative cursor-pointer"
    >
      <Cat />
      <div className="meow-bubble group-hover:opacity-100">
        <span>meow</span>
        <div className="tail"></div>
      </div>
    </div>
  )
}
