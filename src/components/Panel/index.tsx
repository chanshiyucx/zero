import React from 'react'
import clsx from 'clsx'
import color from 'color'
import { Theme, ThemeType } from '@/type'

import styles from './index.module.css'

type PanelProps = {
  likeSite: boolean
  likeCount: number
  list: Theme[]
  theme: ThemeType
  togglePanle: () => void
  toggleTheme: (theme: ThemeType) => void
  handleLike: () => void
}

const Panel: React.FC<PanelProps> = ({ likeSite, likeCount, list, theme, togglePanle, toggleTheme, handleLike }) => {
  const likeContent = likeSite ? `${likeCount} 位旅行者见证种子的发芽` : `${likeCount} 位旅行者带来故事的种子`

  return (
    <div className={styles.panel}>
      <div className={styles.mask} onClick={togglePanle}></div>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles['short-line']}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.content}>
            <div className={styles.head}>画笔，臣服于我！</div>
            <ul className={styles.body}>
              {list.map((t) => {
                return (
                  <li
                    key={t.name}
                    className={clsx('cursor-pointer', theme === t.type && styles.active)}
                    onClick={() => toggleTheme(t.type)}
                  >
                    <span
                      style={{
                        borderColor: t.color,
                        backgroundColor: color(t.color).alpha(0.3).string(),
                      }}
                    >
                      {t.name}
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className={styles.foot}>
              <div className={styles.like} data-title={likeContent} onClick={handleLike}></div>
            </div>
          </div>
          <div className={styles['long-line']}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
