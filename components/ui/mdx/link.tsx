import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

export function Link(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) {
  return <a className="link" {...props}></a>
}
