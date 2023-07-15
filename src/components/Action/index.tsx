import React, { useState, useEffect, useRef } from 'react'
import { Send } from '@components/Icons'
import './index.css'

type ActionProps = {}

const Action: React.FC<ActionProps> = () => {
  const timerRef = useRef<number>()
  const [showBackTop, setShowBackTop] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScroll = () => {
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setShowBackTop(window.pageYOffset >= 200)
    }, 100)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)
    return () => window.removeEventListener('scroll', handleScroll, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed bottom-4 right-4 flex items-center z-10">
      {showBackTop && <Send className="action" onClick={scrollToTop} />}
    </div>
  )
}

export default Action
