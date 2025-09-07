import { type JSX, type ReactNode, type SVGProps } from 'react'
import {
  Bash,
  Cloudflare,
  CSS3,
  Docker,
  Electron,
  Figma,
  Git,
  HTML5,
  Java,
  JavaScript,
  Linux,
  MySQL,
  NextJS,
  NodeJS,
  Python,
  ReactJS,
  Tailwindcss,
  TypeScript,
  Vite,
  VueJS,
} from '@/components/icons'
import { range } from '@/lib/utils/helper'

interface IconItem {
  title: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

interface StackLine {
  top: IconItem[]
  bottom: IconItem[]
}

interface MarqueeProps {
  children: ReactNode
  direction?: 'left' | 'up'
  pauseOnHover?: boolean
  reverse?: boolean
  fade?: boolean
}

const stackLines: StackLine = {
  top: [
    { title: 'Typescript', icon: TypeScript },
    { title: 'JavaScript', icon: JavaScript },
    { title: 'HTML5', icon: HTML5 },
    { title: 'CSS3', icon: CSS3 },
    { title: 'React', icon: ReactJS },
    { title: 'Vue', icon: VueJS },
    { title: 'NextJS', icon: NextJS },
    { title: 'Tailwind CSS', icon: Tailwindcss },
    { title: 'Java', icon: Java },
    { title: 'Python', icon: Python },
  ],
  bottom: [
    { title: 'Linux', icon: Linux },
    { title: 'Docker', icon: Docker },
    { title: 'NodeJS', icon: NodeJS },
    { title: 'Git', icon: Git },
    { title: 'Bash Script', icon: Bash },
    { title: 'MySQL', icon: MySQL },
    { title: 'Vite', icon: Vite },
    { title: 'Electron', icon: Electron },
    { title: 'Figma', icon: Figma },
    { title: 'Cloudflare', icon: Cloudflare },
  ],
}

function Marquee({
  children,
  direction = 'left',
  pauseOnHover = false,
  reverse = false,
  fade = false,
}: MarqueeProps) {
  const ifToRightOrToBottom = (direction: string) =>
    direction === 'left' ? 'to right' : 'to bottom'

  return (
    <div
      className='group flex flex-col gap-4 overflow-hidden data-[direction="left"]:flex-row'
      data-direction={direction}
      style={{
        maskImage: fade
          ? `linear-gradient(${ifToRightOrToBottom(
              direction,
            )}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
      }}
    >
      {range(0, 3).map((i) => (
        <div
          key={i}
          data-direction={direction}
          data-pause-on-hover={pauseOnHover}
          data-reverse={reverse}
          className="animate-marquee-up data-[direction='left']:animate-marquee-left data-[reverse='true']:direction-reverse flex shrink-0 flex-col justify-around gap-4 [--gap:1rem] data-[direction='left']:flex-row group-hover:data-[pause-on-hover='true']:[animation-play-state:paused]"
        >
          {children}
        </div>
      ))}
    </div>
  )
}

const IconElement = ({ data: { icon: Icon, title } }: { data: IconItem }) => (
  <div
    key={title}
    title={title}
    className="flex items-center justify-center text-4xl"
  >
    <Icon />
  </div>
)

export const StacksCard = () => {
  return (
    <div className="flex h-24 w-full flex-col justify-between gap-3 overflow-hidden rounded-lg p-2">
      <Marquee fade pauseOnHover>
        {stackLines.top.map((data) => (
          <IconElement key={data.title} data={data} />
        ))}
      </Marquee>

      <Marquee reverse fade pauseOnHover>
        {stackLines.bottom.map((data) => (
          <IconElement key={data.title} data={data} />
        ))}
      </Marquee>
    </div>
  )
}
