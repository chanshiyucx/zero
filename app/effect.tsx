'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname } from 'next/navigation'
import { useContext, useRef, type ReactNode } from 'react'
import { useDeviceListener } from '@/hooks'

function FrozenRouter(props: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {})
  const frozen = useRef(context).current

  if (!frozen) {
    return <>{props.children}</>
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  )
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
}

const PageTransitionEffect = ({ children }: { children: ReactNode }) => {
  const key = usePathname()
  useDeviceListener()

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        className="flex flex-1"
        variants={variants}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransitionEffect
