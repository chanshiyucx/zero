'use client'

import type { CSSProperties } from 'react'
import { useThemeTransition } from '@/hook/use-theme-transition'

interface CatProps {
  size?: number
}

export function Cat({ size = 120 }: CatProps) {
  const { toggleTheme } = useThemeTransition()

  const style = {
    '--cat-size': `${size}px`,
  } as CSSProperties

  return (
    <div className="cute-cat" style={style} onClick={toggleTheme}>
      <span className="the-sun"></span>
      <span className="the-moon"></span>
      <div className="the-cat">
        <div className="cat-face">
          <section className="eyes left">
            <span className="pupil"></span>
          </section>
          <section className="eyes right">
            <span className="pupil"></span>
          </section>
          <span className="nose"></span>
        </div>
      </div>
    </div>
  )
}
