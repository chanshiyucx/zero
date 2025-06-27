import { ReactNode } from 'react'
import { CopyButton } from './copy-button'

interface FigureProps extends React.ComponentPropsWithoutRef<'figure'> {
  children?: ReactNode
  raw?: string
  'data-rehype-pretty-code-figure'?: boolean
}

export function Figure({ children, raw, ...props }: FigureProps) {
  const showCopyButton = raw && 'data-rehype-pretty-code-figure' in props
  return (
    <figure {...props} className="group relative">
      {children}
      {showCopyButton && <CopyButton text={raw} />}
    </figure>
  )
}
