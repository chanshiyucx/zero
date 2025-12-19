import type { SVGProps } from 'react'

export function Laptop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          fill="currentColor"
          fillOpacity="0"
          strokeDasharray="56"
          strokeDashoffset="56"
          d="M12 17h-7v-10h14v10Z"
        >
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="1.1s"
            dur="0.15s"
            values="0;0.3"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="56;0"
          />
        </path>
        <path strokeDasharray="20" strokeDashoffset="20" d="M3 19h18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.4s"
            values="20;0"
          />
        </path>
      </g>
    </svg>
  )
}
