import type { Theme, ThemeType } from '@/type'
import clsx from 'clsx'
import color from 'color'
import { ExternalLink } from 'lucide-react'
import { FC } from 'react'
import styles from './index.module.css'

interface PanelProps {
  list: Theme[]
  theme: ThemeType
  togglePanle: () => void
  toggleTheme: (theme: ThemeType) => void
}

const Panel: FC<PanelProps> = ({ list, theme, togglePanle, toggleTheme }) => {
  const currentTheme = list.find((e) => e.type === theme)

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
            <div className={styles.head}>霞彩焕花火，花火知我愿</div>
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
              <a className={styles.description} href={currentTheme?.url} rel="noopener noreferrer" target="_blank">
                {currentTheme?.description} <ExternalLink />
              </a>
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
