import type { Theme, ThemeType } from '@/type'
import clsx from 'clsx'
import color from 'color'
import { FC } from 'react'
import './index.css'

interface PanelProps {
  list: Theme[]
  theme: ThemeType
  togglePanle: () => void
  toggleTheme: (theme: ThemeType) => void
}

const Panel: FC<PanelProps> = ({ list, theme, togglePanle, toggleTheme }) => {
  const currentTheme = list.find((e) => e.type === theme)

  return (
    <div className="panel">
      <div className="overlay" onClick={togglePanle}></div>
      <div className="main">
        <div className="wrapper">
          <div className="short-line">
            <div></div>
            <div></div>
          </div>
          <div className="content">
            <div className="head">霞彩焕花火，花火知我愿</div>
            <ul className="body">
              {list.map((t) => {
                return (
                  <li
                    key={t.name}
                    className={clsx('cursor-pointer', theme === t.type && 'active')}
                    onClick={() => toggleTheme(t.type)}
                  >
                    <span
                      style={{
                        borderColor: t.color.primary,
                        backgroundColor: color(t.color.primary).alpha(0.3).string(),
                      }}
                    >
                      {t.name}
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className="foot">
              <a
                className="description"
                href={currentTheme?.url}
                rel="noopener noreferrer"
                target="_blank"
                data-title={currentTheme?.description}
              ></a>
            </div>
          </div>
          <div className="long-line">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
