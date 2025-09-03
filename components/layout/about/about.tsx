import { HandWavingIcon } from '@phosphor-icons/react/dist/ssr'
import Link, { type LinkProps } from 'next/link'
import { type JSX, type SVGProps } from 'react'
import {
  Java,
  JavaScript,
  Python,
  ReactJS,
  TypeScript,
  VueJS,
} from '@/components/icons'
import { Logo } from '@/components/ui/logo'
import { CV } from './cv'

interface LinkElementProps {
  href: string
  title: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

const LinkElement = ({ icon: Icon, href, title }: LinkElementProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="tiny-button mx-1 inline-flex translate-y-0.5 items-center gap-1 border-none no-underline"
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

const VueLink = () => (
  <LinkElement href="https://vuejs.org/" title="Vue.js" icon={VueJS} />
)

const ReactJSLink = () => (
  <LinkElement href="https://react.dev/" title="React" icon={ReactJS} />
)

const PythonLink = () => (
  <LinkElement href="https://www.python.org/" title="Python" icon={Python} />
)

const JavaLink = () => (
  <LinkElement href="https://www.java.com/" title="Java" icon={Java} />
)

const PageLink = ({ label, ...props }: { label: string } & LinkProps) => (
  <Link {...props} className="link mx-1">
    {label}
  </Link>
)

export function About() {
  let stagger = 0

  return (
    <div className="prose prose-rosepine w-full max-w-none">
      <div className="flex flex-row items-end gap-6 max-md:flex-col max-md:items-start max-md:gap-0">
        <div
          style={{ '--enter-stagger': stagger++ }}
          className="max-md:self-center"
        >
          <Logo />
        </div>

        <div style={{ '--enter-stagger': stagger++ }}>
          <h2 className="text-subtle text-xs">
            Full-Stack Developer / Budding Photographer
          </h2>

          <p className="mb-0">
            <HandWavingIcon weight="duotone" className="mr-1 inline text-xl" />
            <span>
              Hello, I&apos;m Shiyu. Welcome to my little corner on the web!
            </span>
          </p>
        </div>
      </div>

      <p style={{ '--enter-stagger': stagger++ }}>
        I&apos;m a full stack developer passionate about crafting clean and
        well-architected code. I enjoy exploring modern technologies in the
        <JavaScriptLink />,<TypeScriptLink />,<VueLink />, and <ReactJSLink />
        ecosystems. Additionally, I have some basic knowledge of <JavaLink />
        and <PythonLink />.
      </p>

      <p style={{ '--enter-stagger': stagger++ }}>
        Maybe you will find something interesting in my
        <PageLink label="blog posts" href="/blog/posts" /> or
        <PageLink label="study notes" href="/blog/notes" />! Feel free to
        explore <PageLink label="the projects" href="/projects" /> I&apos;ve
        poured my effort into.
      </p>

      <div className="flex flex-row gap-3 max-md:flex-col">
        <div>
          <p className="mt-0" style={{ '--enter-stagger': stagger++ }}>
            I aspire to become a polyglot, dedicating myself to refining my
            <PageLink label="English" href="/polyglot/english" /> proficiency
            while also starting to learn
            <PageLink label="German" href="/polyglot/german" />. Though
            challenging, I believe this path will be deeply rewarding.
          </p>

          <p style={{ '--enter-stagger': stagger++ }}>
            As a budding photographer, I collect fragments of my journey in my
            <PageLink label="album" href="/album" />, where you can glimpse the
            moments I hold dear.
          </p>

          <p style={{ '--enter-stagger': stagger++ }}>
            I listen to my <PageLink label="vibes" href="/vibes" />, they guide
            me through silence. Life is short, code is long.
          </p>
        </div>
        <div style={{ '--enter-stagger': stagger++ }}>
          <CV />
        </div>
      </div>
    </div>
  )
}
