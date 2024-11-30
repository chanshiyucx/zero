import type { SVGProps } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import NextLink, { LinkProps } from 'next/link'
import {
  Hand,
  JavaScript,
  Python,
  ReactJS,
  TypeScript,
} from '@/components/icons'

interface LinkElementProps {
  href: string
  title: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

const LinkElement = ({ icon: Icon, href, title }: LinkElementProps) => (
  <a
    href={href}
    target="_blank"
    className="tinyThumb inline-flex items-center gap-px"
  >
    <Icon />
    <span className="text-sm">{title}</span>
  </a>
)

const JavaScriptLink = () => (
  <LinkElement
    href="https://www.javascript.com/"
    title="JavaScript"
    icon={JavaScript}
  />
)

const TypeScriptLink = () => (
  <LinkElement
    href="https://www.typescriptlang.org/"
    title="TypeScript"
    icon={TypeScript}
  />
)

const PythonLink = () => (
  <LinkElement
    href="https://www.typescriptlang.org/"
    title="Python"
    icon={Python}
  />
)

const ReactJSLink = () => (
  <LinkElement href="https://react.dev/" title="ReactJS" icon={ReactJS} />
)

const Link = ({ label, ...props }: { label: string } & LinkProps) => (
  <NextLink
    {...props}
    className="inline-flex items-center rounded-md px-1 font-medium text-black transition hover:bg-neutral-200/50"
  >
    <span>{label}</span>
    <ArrowUpRight size="1em" className="text-xs" />
  </NextLink>
)

export function Introduction() {
  return (
    <div className="flex-1 space-y-4">
      <h2 className="text-xs text-subtle">Full-Stack Developer</h2>

      <p>
        <Hand />
        <span>Hello, welcome to my little corner on the web!</span>
      </p>

      <p>
        I&apos;m a self-taught code solutions programmer, I love programming and
        I try to use the most <strong>software architecture</strong>,
        <strong>clean</strong> and <strong>maintainable code</strong>. I like to
        work with technologies from the <JavaScriptLink />, <TypeScriptLink />,
        <PythonLink /> and <ReactJSLink /> ecosystem.
      </p>

      <p>
        I&apos;m always learning and here you can find out about the projects
        I&apos;ve completed and am working on, as well as details about my
        career and skills. I&apos;m always looking to improve, and you can
        follow my progress and what I&apos;m currently studying.
      </p>

      <p>
        See more <Link label="about me" href="/about" /> or take a look into
        <Link label="my projects" href="/projects" /> {';)'}
      </p>

      <p>
        Maybe you can learn something on my
        <Link label="blog posts" href="/blog" /> or with my
        <Link label='"Today I Learn"' href="/blog/til" /> notes!
      </p>

      <p>
        I hope I can help you. I&apos;d love to hear your ideas and contribute
        whenever possible.
      </p>
    </div>
  )
}
