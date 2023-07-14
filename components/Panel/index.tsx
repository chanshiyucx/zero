import clsx from 'clsx'
import color from 'color'
import { FC, useContext } from 'react'
import { ThemeContext } from '@/app/context'
import themeList from '@/utils/theme'
import './index.css'

interface PanelProps {
  togglePanle: () => void
}

const Panel: FC<PanelProps> = ({ togglePanle }) => {
  const { theme, setTheme } = useContext(ThemeContext)
  const currentTheme = themeList.find((e) => e.type === theme)

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
              {themeList.map((t) => {
                return (
                  <li
                    key={t.name}
                    className={clsx('cursor-pointer', theme === t.type && 'active')}
                    onClick={() => setTheme(t.type)}
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
