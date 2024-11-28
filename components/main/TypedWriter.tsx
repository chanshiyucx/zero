'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const sentences: string[] = [
  'Tech stuff enthusiast',
  'Nature admirer',
  'Enjoyer of good books',
  'Full stack developer',
]

export function TypedWriter() {
  const TypedElement = useRef(null)

  useEffect(() => {
    if (!TypedElement.current) return

    const typed = new Typed(TypedElement.current, {
      strings: sentences,
      typeSpeed: 80,
      backSpeed: 50,
      startDelay: 0,
      backDelay: 2000,
      shuffle: false,
      loop: true,
    })

    return () => typed.destroy()
  }, [])

  return <span ref={TypedElement}></span>
}
