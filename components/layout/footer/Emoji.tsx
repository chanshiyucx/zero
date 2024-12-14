'use client'

import { useEffect, useState } from 'react'
import { random } from '@/lib/utils/helper'

const EMOJI = [
  '👀',
  '🌱',
  '🌸',
  '🌹',
  '🎄',
  '🍬',
  '🍭',
  '🎀',
  '🎈',
  '🎉',
  '🎨',
  '📚',
  '🔮',
  '🧩',
  '💘',
  '💫',
  '🌟',
  '🐶',
  '🎏',
  '🎐',
  '🎁',
  '👻',
  '🎊',
  '🍒',
  '🎃',
  '🌈',
]

function getRandomEmoji(exclude?: string) {
  const emoji = exclude ? EMOJI.filter((emoji) => emoji !== exclude) : EMOJI
  return emoji[random(0, emoji.length)]
}

export function Emoji() {
  const [emoji, setEmoji] = useState(EMOJI[0])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setEmoji((emoji) => getRandomEmoji(emoji))
    }, 500)

    return () => window.clearInterval(interval)
  }, [])

  return <span>{emoji}</span>
}
