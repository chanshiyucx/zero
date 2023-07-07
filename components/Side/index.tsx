'use client'

import type { Theme, ThemeType } from '@/type'
import clsx from 'clsx'
import color from 'color'
import {
  BookMarked,
  BookOpen,
  Codepen,
  Ghost,
  Github,
  HeartPulse,
  Mail,
  Music,
  ScrollText,
  Send,
  Sparkles,
  Twitter,
} from 'lucide-react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useLayoutEffect, useState } from 'react'
import Ayaka from '@/assets/images/ayaka.jpg'
import Beelzebul from '@/assets/images/beelzebul.jpg'
import Ganyu from '@/assets/images/ganyu.jpg'
import Hutao from '@/assets/images/hutao.jpg'
import Keqing from '@/assets/images/keqing.jpg'
import Kokomi from '@/assets/images/kokomi.jpg'
import Nahida from '@/assets/images/nahida.jpg'
import Yoimiya from '@/assets/images/yoimiya.jpg'
import { Butterfly } from '@/components/Icons'
import Panel from '@/components/Panel'
import Poetry from '@/components/Poetry'
import ShootingStar from '@/components/ShootingStar'
import { loadImage, random } from '@/utils'
import config from '@/utils/config'
import { useLocalStorage } from '@/utils/hook'
import './index.css'

const siteFont = localFont({ src: '../../assets/font/GuDianMingChaoTi.ttf', display: 'swap' })

const { github, twitter, telegram, email, music, blog } = config.contact

const list: Theme[] = [
  {
    type: 'Hutao',
    name: '雪霁梅香',
    description: '幽蝶留芳之处',
    color: '#903F36',
    image: Hutao,
    url: 'https://www.bilibili.com/video/av591337987/',
  },
  {
    type: 'Keqing',
    name: '霆霓快雨',
    description: '千帆齐聚之城',
    color: '#8D83A3',
    image: Keqing,
    url: 'https://www.bilibili.com/video/BV14K4y1Q7PH/',
  },
  {
    type: 'Ganyu',
    name: '循循守月',
    description: '仙泽麟行之迹',
    color: '#5260A6',
    image: Ganyu,
    url: 'https://www.bilibili.com/video/BV1ZL4y147cB/',
  },
  {
    type: 'Beelzebul',
    name: '一心净土',
    description: '天光澄寂之景',
    color: '#9F87C2',
    image: Beelzebul,
    url: 'https://www.bilibili.com/video/BV1UY411g7RU/',
  },
  {
    type: 'Ayaka',
    name: '白鹭霜华',
    description: '白鹭儃伫之思',
    color: '#7A8FB7',
    image: Ayaka,
    url: 'https://www.bilibili.com/video/BV1nY4y1a76M/',
  },
  {
    type: 'Yoimiya',
    name: '琉焰华舞',
    description: '硝彩盛放之光',
    color: '#BC5039',
    image: Yoimiya,
    url: 'https://www.bilibili.com/video/BV1Zd4y1K76h/',
  },
  {
    type: 'Kokomi',
    name: '真珠之智',
    description: '浮岳映虹之波',
    color: '#BF9997',
    image: Kokomi,
    url: 'https://www.bilibili.com/video/BV1ML411N7hm/',
  },
  {
    type: 'Nahida',
    name: '白草净华',
    description: '如风如露之思',
    color: '#9DBB92',
    image: Nahida,
    url: 'https://www.bilibili.com/video/BV1wm4y1m7DC/',
  },
]
const randomTheme = list[random(0, list.length)]

const Side: FC = () => {
  const pathname = usePathname()
  const [showPanel, setShowPanel] = useState(false)
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', randomTheme.type, 24 * 60 * 60 * 1000)

  const toggleTheme = (theme: ThemeType) => setTheme(theme)
  const togglePanle = () => setShowPanel((c) => !c)

  useLayoutEffect(() => {
    const t = list.find((e) => e.type === theme)!
    loadImage(t.image.src).then(() => {
      document.documentElement.style.setProperty('--theme-color', t.color)
      document.documentElement.style.setProperty('--background-color', color(t.color).alpha(0.2).string())
      document.documentElement.style.setProperty('--background-image', `url('${t.image.src}')`)
      const element = document.getElementsByTagName('body')[0]
      const classList = list.map((e) => e.type)
      element.classList.remove(...classList)
      element.classList.add(theme)
    })
  }, [theme])

  return (
    <div className="side sticky top-0 flex h-screen min-w-[24rem] flex-col items-start justify-between">
      <ShootingStar />
      {showPanel && <Panel list={list} theme={theme} toggleTheme={toggleTheme} togglePanle={togglePanle} />}

      {/* side menu */}
      <div className="z-10 flex h-3/5 w-full justify-end">
        <nav className="nav nav-y flex w-12 flex-col items-center justify-end">
          <Link className={clsx(pathname === '/' && 'active')} href="/" data-name="首页">
            <ScrollText />
          </Link>
          <Link className={clsx(pathname === '/inspiration' && 'active')} href="/inspiration" data-name="灵感">
            <Sparkles />
          </Link>
          <Link className={clsx(pathname === '/project' && 'active')} href="/project" data-name="项目">
            <Codepen />
          </Link>
          <Link className={clsx(pathname === '/book' && 'active')} href="/book" data-name="书单">
            <BookOpen />
          </Link>
          <Link className={clsx(pathname === '/friend' && 'active')} href="/friend" data-name="友邻">
            <HeartPulse />
          </Link>
          <Link className={clsx(pathname === '/about' && 'active')} href="/about" data-name="自述">
            <Ghost />
          </Link>
        </nav>

        <div className="flex flex-1 flex-col justify-end pb-3 pl-3">
          <div className={clsx(siteFont.className, 'pb-12')}>
            <h3 className="text-6xl tracking-wider">蟬時雨</h3>
            <span className="inline-block pl-1 pt-2 text-xl tracking-wider">蝉鸣如雨 花宵道中</span>
          </div>

          <Poetry />
        </div>
      </div>

      {/* footer menu */}
      <div className="flex justify-end py-12">
        <div className="nya" data-name="時与风" onClick={togglePanle}>
          <Butterfly />
        </div>
        <div className="nav nav-x flex h-12 items-center ">
          <a href={github} rel="noopener noreferrer" target="_blank">
            <Github />
          </a>
          <a href={twitter} rel="noopener noreferrer" target="_blank">
            <Twitter />
          </a>
          <a href={telegram} rel="noopener noreferrer" target="_blank">
            <Send />
          </a>
          <a href={email} rel="noopener noreferrer" target="_blank">
            <Mail />
          </a>
          <a href={music} rel="noopener noreferrer" target="_blank">
            <Music />
          </a>
          <a href={blog} rel="noopener noreferrer" target="_blank">
            <BookMarked />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Side
