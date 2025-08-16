'use client'

import { m, type MotionProps, type Variants } from 'framer-motion'
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react'

type BaseProps<C extends ElementType> = {
  as?: C
  children: ReactNode
} & MotionProps

type PolymorphicComponentProps<C extends ElementType> = BaseProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof BaseProps<C>>

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const

const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
} as const

export function StaggeredFadeInContainer<C extends ElementType = 'div'>({
  as,
  ...props
}: PolymorphicComponentProps<C>) {
  const Component = as ?? 'div'
  const MotionComponent = m(Component as ElementType)

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    />
  )
}

export function StaggeredFadeInItem<C extends ElementType = 'div'>({
  as,
  ...props
}: PolymorphicComponentProps<C>) {
  const Component = as ?? 'div'
  const MotionComponent = m(Component as ElementType)

  return <MotionComponent variants={itemVariants} {...props} />
}
