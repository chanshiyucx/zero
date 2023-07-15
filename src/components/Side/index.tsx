import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import color from 'color'
import { random } from '@/utils'
import { queryLike } from '@utils/service'
import { useLocalStorage } from '@/utils/hook'
import ShootingStar from '@components/ShootingStar'
import Panel from '@components/Panel'
import Poetry from '@components/Poetry'
import { Theme, ThemeType } from '@/type'
import './index.css'
import {
  Home,
  Inbox,
  Book,
  Message,
  Moon,
  Heart,
  User,
  Github,
  Twitter,
  Telegram,
  Mail,
  Music,
  Butterfly,
} from '@components/Icons'
import config from '@/config'
import Hutao from '@/assets/images/hutao.jpg'
import Keqing from '@/assets/images/keqing.jpg'
import Ganyu from '@/assets/images/ganyu.jpg'
import Beelzebul from '@/assets/images/beelzebul.jpg'
import Ayaka from '@/assets/images/ayaka.jpg'
import Yoimiya from '@/assets/images/yoimiya.jpg'
import Kokomi from '@/assets/images/kokomi.jpg'
import Nahida from '@/assets/images/nahida.jpg'

const { github, twitter, telegram, email, music, blog } = config.contact

type SideProps = {}

const list: Theme[] = [
  { type: 'Hutao', name: '雪霁梅香', color: '#903F36', image: Hutao },
  { type: 'Keqing', name: '霆霓快雨', color: '#8D83A3', image: Keqing },
  { type: 'Ganyu', name: '循循守月', color: '#5260A6', image: Ganyu },
  { type: 'Beelzebul', name: '一心净土', color: '#9F87C2', image: Beelzebul },
  { type: 'Ayaka', name: '白鹭霜华', color: '#7A8FB7', image: Ayaka },
  { type: 'Yoimiya', name: '琉焰华舞', color: '#BC5039', image: Yoimiya },
  { type: 'Kokomi', name: '真珠之智', color: '#BF9997', image: Kokomi },
  { type: 'Nahida', name: '白草净华', color: '#9DBB92', image: Nahida },
]
const randomTheme = list[random(0, list.length)]

const Side: React.FC<SideProps> = () => {
  const location = useLocation()
  const pathname = location.pathname
  const [showPanel, setShowPanel] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', randomTheme.type, 24 * 60 * 60 * 1000)
  const [likeSite, setLikeSite] = useLocalStorage<boolean>('like', false)
  const [likeCount, setLikeCount] = useState(0)
  const handleLike = () => {
    if (likeSite) return
    queryLike().then((data) => {
      setLikeCount(data)
      setLikeSite(true)
    })
  }

  useEffect(() => {
    queryLike('getTimes').then((data) => {
      setLikeCount(data)
    })
  }, [])

  const toggleTheme = (theme: ThemeType) => setTheme(theme)
  const togglePanle = () => {
    if (!isLoad) {
      setIsLoad(true)
      list.forEach((e) => {
        const img = new Image()
        img.src = e.image
      })
    }
    setShowPanel((c) => !c)
  }

  useLayoutEffect(() => {
    const t = list.find((e) => e.type === theme)!
    document.documentElement.style.setProperty('--theme-color', t.color)
    document.documentElement.style.setProperty('--background-color', color(t.color).alpha(0.2).string())
    document.documentElement.style.setProperty('--background-image', `url('${t.image}')`)
    document.getElementsByTagName('body')[0].className = theme
  }, [theme])

  return (
    <div className="side fixed top-0 left-0 h-full overflow-hidden hidden lg:flex flex-col justify-between">
      <ShootingStar />
      {showPanel && (
        <Panel
          likeSite={likeSite}
          likeCount={likeCount}
          list={list}
          theme={theme}
          toggleTheme={toggleTheme}
          togglePanle={togglePanle}
          handleLike={handleLike}
        />
      )}

      {/* side menu */}
      <div className="w-full h-3/5 flex justify-end z-10">
        <nav className="nav nav-y flex flex-col justify-end items-center w-12">
          <Link className={clsx(pathname === '/' && 'active')} to="/" data-name="首页">
            <Home />
          </Link>
          <Link className={clsx(pathname === '/inspiration' && 'active')} to="/inspiration" data-name="灵感">
            <Message />
          </Link>
          <Link className={clsx(pathname === '/project' && 'active')} to="/project" data-name="项目">
            <Inbox />
          </Link>
          <Link className={clsx(pathname === '/book' && 'active')} to="/book" data-name="书单">
            <Book />
          </Link>
          <Link className={clsx(pathname === '/friend' && 'active')} to="/friend" data-name="友邻">
            <Heart />
          </Link>
          <Link className={clsx(pathname === '/about' && 'active')} to="/about" data-name="自述">
            <User />
          </Link>
        </nav>
        <div className="head flex flex-col justify-end pl-3 pb-3 w-2/3">
          <h3 className="title text-6xl tracking-wider">蟬時雨</h3>
          <span className="subtitle pt-2 pb-8 pl-1 text-xl tracking-wider">蝉鸣如雨 花宵道中</span>
          <Poetry />
        </div>
      </div>

      {/* footer menu */}
      <div className="flex justify-end py-12">
        <div className="nya" data-name="時与风" onClick={togglePanle}>
          <Butterfly />
        </div>
        <div className="nav nav-x flex items-center w-2/3 h-12 ">
          <a href={github} rel="noopener noreferrer" target="_blank">
            <Github />
          </a>
          <a href={twitter} rel="noopener noreferrer" target="_blank">
            <Twitter />
          </a>
          <a href={telegram} rel="noopener noreferrer" target="_blank">
            <Telegram />
          </a>
          <a href={email} rel="noopener noreferrer" target="_blank">
            <Mail />
          </a>
          <a href={music} rel="noopener noreferrer" target="_blank">
            <Music />
          </a>
          <a href={blog} rel="noopener noreferrer" target="_blank">
            <Moon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Side
