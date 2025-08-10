'use client'

import { TypeAnimation } from 'react-type-animation'

const SENTENCES = [
  'Tech stuff enthusiast',
  'Nature admirer',
  'Curious mind wanderer',
  'Full stack developer',
]

const sequenceWithPauses = SENTENCES.flatMap((text) => [text, 3000])

export function TypedWriter() {
  return (
    <TypeAnimation
      sequence={sequenceWithPauses}
      wrapper="span"
      speed={20}
      deletionSpeed={40}
      className="italic"
      repeat={Infinity}
    />
  )
}
