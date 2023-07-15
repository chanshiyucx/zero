import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import KeepAlive from 'react-activation'
import './App.css'
import Side from '@components/Side'
import Header from './components/Header'
import Cloud from '@components/Cloud'
import Action from '@components/Action'
import Home from '@/pages/Home'
import Project from '@/pages/Project'
import Book from '@/pages/Book'
import Inspiration from '@/pages/Inspiration'
import Friend from '@/pages/Friend'
import About from '@/pages/About'
import Post from '@/pages/Post'
import { getLocation } from '@/utils'
import { visitorStatistics } from '@utils/service'

const ZeroRoutes = () => {
  const location = useLocation()
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames="fade-in"
        appear
        in
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      >
        <Routes location={location}>
          <Route
            path={'/'}
            element={
              <KeepAlive cacheKey="Home">
                <Home />
              </KeepAlive>
            }
          />
          <Route path={'/project'} element={<Project />} />
          <Route path={'/book'} element={<Book />} />
          <Route path={'/inspiration'} element={<Inspiration />} />
          <Route path={'/friend'} element={<Friend />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/post/:num'} element={<Post />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  )
}

const App = () => {
  useEffect(() => {
    const referrer = getLocation(document.referrer)
    const hostname = referrer.hostname || '直接访问'
    visitorStatistics(hostname)
  }, [])

  return (
    <div className="app">
      <Cloud />
      <Action />
      <Side />
      <Header />
      <ZeroRoutes />
    </div>
  )
}
export default App
