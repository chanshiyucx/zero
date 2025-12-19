import type { ComponentPropsWithoutRef } from 'react'

export function Link(props: ComponentPropsWithoutRef<'a'>) {
  return <a className="link" {...props}></a>
}
