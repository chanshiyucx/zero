'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const SENTENCES = [
  'Tech stuff enthusiast',
  'Nature admirer',
  'Curious mind wanderer',
  'Full stack developer',
]

const TYPED_OPTIONS = {
  strings: SENTENCES,
  typeSpeed: 80,
  backSpeed: 50,
  startDelay: 0,
  backDelay: 2000,
  shuffle: false,
  loop: true,
}

export function TypedWriter() {
  const typedElementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedElementRef.current) return

    const typed = new Typed(typedElementRef.current, TYPED_OPTIONS)
    return () => typed.destroy()
  }, [])

  return <span ref={typedElementRef} />
}
