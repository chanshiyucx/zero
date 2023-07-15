import React, { useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import clsx from 'clsx'
// @ts-ignore
import Zooming from 'zooming'
import Heading from './Heading'
import Link from './Link'
import Image from './Image'
import Code from './Code'
import styles from './index.module.css'

type MarkdownProps = {
  className?: string
  content: string
}

const zooming = new Zooming({
  bgColor: 'var(--background-color)',
  enableGrab: false,
})

const Markdown: React.FC<MarkdownProps> = ({ className, content }) => {
  useLayoutEffect(() => {
    zooming.listen('.img-zoomable')
  }, [])

  return (
    <div className="text-justify leading-7">
      <ReactMarkdown
        className={clsx(className, styles.markdown)}
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: Heading,
          h2: Heading,
          h3: Heading,
          h4: Heading,
          h5: Heading,
          h6: Heading,
          a: Link,
          img: Image,
          code: Code,
          pre: Code,
        }}
      />
    </div>
  )
}

export default Markdown
