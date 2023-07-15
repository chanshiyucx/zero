import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import './index.css'
import { Home, Inbox, Book, Message, Heart, User } from '@components/Icons'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  const handleToggle = () => {
    setOpen((c) => !c)
  }

  return (
    <div className="header relative px-6 h-16 flex lg:hidden justify-between items-center shadow-sm z-10">
      <h3 className="title text-4xl tracking-wider">蟬時雨</h3>

      <nav className={clsx('nav hidden sm:flex items-center', open && 'nav-over')}>
        <Link className={clsx(pathname === '/' && 'active')} to="/">
          <Home /> 首页
        </Link>
        <Link className={clsx(pathname === '/inspiration' && 'active')} to="/inspiration">
          <Message /> 灵感
        </Link>
        <Link className={clsx(pathname === '/project' && 'active')} to="/project">
          <Inbox /> 项目
        </Link>
        <Link className={clsx(pathname === '/book' && 'active')} to="/book">
          <Book /> 书单
        </Link>
        <Link className={clsx(pathname === '/friend' && 'active')} to="/friend">
          <Heart /> 友邻
        </Link>
        <Link className={clsx(pathname === '/about' && 'active')} to="/about">
          <User /> 自述
        </Link>
      </nav>

      <div className={clsx('toggle flex sm:hidden flex-col w-7', open && 'active')} onClick={handleToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Header
