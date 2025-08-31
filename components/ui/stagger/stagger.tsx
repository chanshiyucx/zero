'use client'

import {
  m,
  type MotionProps,
  type TargetAndTransition,
  type Variants,
} from 'framer-motion'
import {
  Children,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils/style'

type BaseProps<C extends ElementType> = {
  children: ReactNode
  as?: C
  className?: string
  staggerChildren?: number
} & MotionProps

export type PolymorphicComponentProps<C extends ElementType> = BaseProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof BaseProps<C>>

const defaultStagger = 0.08

const baseContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: defaultStagger,
    },
  },
}

const baseItemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: defaultStagger,
      ease: [0.16, 1, 0.3, 1],
      duration: 1,
    },
  },
}

const createStaggerVariants = (
  baseVariants: Variants,
  staggerChildren?: number,
): Variants => {
  if (staggerChildren === undefined) {
    return baseVariants
  }

  const visibleVariant = baseVariants.visible as TargetAndTransition
  return {
    ...baseVariants,
    visible: {
      ...visibleVariant,
      transition: {
        ...visibleVariant.transition,
        staggerChildren: staggerChildren,
      },
    },
  }
}

export function StaggeredFadeInContainer<C extends ElementType = 'div'>({
  as,
  staggerChildren,
  ...props
}: PolymorphicComponentProps<C>) {
  const Component = as ?? 'div'
  const MotionComponent = m(Component as ElementType)

  const variants = useMemo(
    () => createStaggerVariants(baseContainerVariants, staggerChildren),
    [staggerChildren],
  )

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    />
  )
}

export function StaggeredFadeInItem<C extends ElementType = 'div'>({
  as,
  className,
  staggerChildren,
  ...props
}: PolymorphicComponentProps<C>) {
  const Component = as ?? 'div'
  const MotionComponent = m(Component as ElementType)
  const elementRef = useRef<HTMLElement>(null)

  const variants = useMemo(
    () => createStaggerVariants(baseItemVariants, staggerChildren),
    [staggerChildren],
  )

  const onAnimationComplete = useCallback(() => {
    elementRef.current?.classList.remove('will-change-transform')
  }, [])

  return (
    <MotionComponent
      ref={elementRef}
      variants={variants}
      className={cn(className, 'will-change-transform')}
      onAnimationComplete={onAnimationComplete}
      {...props}
    />
  )
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
