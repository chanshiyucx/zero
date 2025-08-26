'use client'

import { m, type MotionProps, type Variants } from 'framer-motion'
import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type BaseProps<C extends ElementType> = {
  as?: C
  children: ReactNode
} & MotionProps

export type PolymorphicComponentProps<C extends ElementType> = BaseProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof BaseProps<C>>

const staggerChildren = 0.1

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
    },
  },
} as const

const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.5,
      staggerChildren,
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

export function StaggeredFadeInWrap({ children }: { children: ReactNode }) {
  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child
        }

        const props = child.props as MotionProps & HTMLAttributes<HTMLElement>
        const { children: grandChildren, ...restProps } = props

        return (
          <StaggeredFadeInItem as={child.type as ElementType} {...restProps}>
            {grandChildren}
          </StaggeredFadeInItem>
        )
      })}
    </>
  )
}
