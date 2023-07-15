import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ComponentPropsWithoutRef, ComponentType, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import { External } from '@components/Icons'

type LinkProps = ComponentPropsWithoutRef<'a'> & ReactMarkdownProps

type LinkComponent = ComponentType<LinkProps>

const Link: LinkComponent = ({ href, children }) => {
  const navigate = useNavigate()

  const handleRedirect = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation()
    if (!href) return
    const toUrl = new URL(href)
    const locateUrl = new URL(window.location.href)
    if (toUrl.host === locateUrl.host) {
      e.preventDefault()
      const pathArr = toUrl.pathname.split('/').filter(Boolean)
      const headPath = pathArr[0]
      switch (headPath) {
        case 'posts': {
          navigate('/posts/[number]')
          break
        }
        default: {
          navigate(toUrl.pathname)
        }
      }
    }
  }

  return (
    <a className="link" href={href} onClick={handleRedirect} target="_blank" rel="noopener noreferrer">
      {children}
      <External className="inline-block w-5 h-5 transform -translate-y-0.5" />
    </a>
  )
}

export default Link
