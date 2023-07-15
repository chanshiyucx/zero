import React, { createElement, DOMAttributes } from 'react'
import { HeadingComponent } from 'react-markdown/lib/ast-to-react'
import styles from './index.module.css'

const Heading: HeadingComponent = ({ level, children }) => {
  const title = String(children?.[0])

  return (
    <>
      {createElement<DOMAttributes<HTMLHeadingElement>, HTMLHeadingElement>(
        `h${level}`,
        {
          className: styles.heading,
          id: title,
        } as any,
        [<span key="anchor">H{level}</span>, children],
      )}
    </>
  )
}

export default Heading
