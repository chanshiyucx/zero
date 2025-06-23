import type { JSX, SVGProps } from 'react'
import NextLink, { LinkProps } from 'next/link'
import {
  Hand,
  Java,
  JavaScript,
  Python,
  ReactJS,
  TypeScript,
  VueJS,
} from '@/components/icons'
import { CV } from './CV'

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
  <LinkElement href="https://vuejs.org/" title="VueJS" icon={VueJS} />
)

const ReactJSLink = () => (
  <LinkElement href="https://react.dev/" title="ReactJS" icon={ReactJS} />
)

const PythonLink = () => (
  <LinkElement href="https://www.python.org/" title="Python" icon={Python} />
)

const JavaLink = () => (
  <LinkElement href="https://www.java.com/" title="Java" icon={Java} />
)

const Link = ({ label, ...props }: { label: string } & LinkProps) => (
  <NextLink {...props} className="link mx-1">
    {label}
  </NextLink>
)

export function About() {
  return (
    <div className="prose prose-rosepine w-full max-w-none">
      <h2 className="text-subtle text-xs">Full-Stack Developer</h2>

      <p>
        <Hand width="1.3rem" height="1.3rem" />
        <span>Hello, welcome to my little corner on the web!</span>
      </p>

      <p>
        I&apos;m a self-taught programmer passionate about crafting clean,
        maintainable, and well-architected code solutions. My love for
        programming drives me to continuously explore modern technologies in the
        <JavaScriptLink />,<TypeScriptLink />,<VueLink />, and <ReactJSLink />
        ecosystems. Additionally, I have some basic knowledge of <JavaLink />
        and <PythonLink />.
      </p>

      <div className="flex flex-row gap-3 max-md:flex-col">
        <div>
          <p className="mt-0">
            Maybe you will find something interesting in my
            <Link label="blog posts" href="/blog/posts" /> or
            <Link label="study notes" href="/blog/notes" />! Feel free to
            explore <Link label="the projects" href="/projects" /> I&apos;ve
            poured my effort into.
          </p>

          <p>
            I aspire to become a <Link label="polyglot" href="/polyglot" />,
            dedicating myself to refining my English proficiency while also
            starting to learn German. Though challenging, I believe the journey
            will be deeply rewarding.
          </p>

          <p>
            I hope my work can inspire or assist you in some way. I&apos;d love
            to hear your ideas and contribute whenever possible.
          </p>
        </div>
        <CV />
      </div>
    </div>
  )
}
