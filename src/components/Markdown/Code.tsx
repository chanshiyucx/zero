import React from 'react'
import clsx from 'clsx'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import styles from './index.module.css'

import conf from 'react-syntax-highlighter/dist/cjs/languages/prism/apacheconf'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c'
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp'
import csharp from 'react-syntax-highlighter/dist/cjs/languages/prism/csharp'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import docker from 'react-syntax-highlighter/dist/cjs/languages/prism/docker'
import git from 'react-syntax-highlighter/dist/cjs/languages/prism/git'
import go from 'react-syntax-highlighter/dist/cjs/languages/prism/go'
import graphql from 'react-syntax-highlighter/dist/cjs/languages/prism/graphql'
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json5'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import kotlin from 'react-syntax-highlighter/dist/cjs/languages/prism/kotlin'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import rust from 'react-syntax-highlighter/dist/cjs/languages/prism/rust'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'
import sql from 'react-syntax-highlighter/dist/cjs/languages/prism/sql'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import theme from '@/assets/styles/code'

const lang = {
  conf,
  bash,
  c,
  cpp,
  csharp,
  css,
  docker,
  git,
  go,
  graphql,
  java,
  javascript,
  js: javascript,
  json,
  jsx,
  kotlin,
  python,
  rust,
  scss,
  swift,
  tsx,
  typescript,
  ts: typescript,
  yaml,
  sql,
}
Object.entries(lang).map(([k, v]) => SyntaxHighlighter.registerLanguage(k, v))

const Code: CodeComponent = ({ node, className, inline, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')

  return !inline && match ? (
    <SyntaxHighlighter
      className={styles.code}
      style={theme as any}
      language={match[1]}
      showLineNumbers={true}
      showInlineLineNumbers={false}
      children={String(children).replace(/\n$/, '')}
      data-language={match[1]}
      {...props}
    />
  ) : (
    <code className={clsx(inline && styles['inline-code'])} {...props}>
      {children}
    </code>
  )
}

export default Code
