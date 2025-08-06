import { type SVGProps } from 'react'

export function Markdown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 128 128"
      className="fill-black dark:fill-white"
      {...props}
    >
      <path
        style={{
          lineHeight: 'normal',
          fontVariantLigatures: 'normal',
          fontVariantPosition: 'normal',
          fontVariantCaps: 'normal',
          fontVariantNumeric: 'normal',
          fontVariantAlternates: 'normal',
          fontVariantEastAsian: 'normal',
          fontFeatureSettings: 'normal',
          fontVariationSettings: 'normal',
          textIndent: 0,
          textAlign: 'start',
          textDecorationLine: 'none',
          textDecorationStyle: 'solid',
          textTransform: 'none',
          textOrientation: 'mixed',
          whiteSpace: 'normal',
          inlineSize: 0,
          isolation: 'auto',
          mixBlendMode: 'normal',
        }}
        d="M11.95 24.348c-5.836 0-10.618 4.867-10.618 10.681v57.942c0 5.814 4.782 10.681 10.617 10.681h104.102c5.835 0 10.617-4.867 10.617-10.681V35.03c0-5.814-4.783-10.681-10.617-10.681H14.898l-.002-.002H11.95zm-.007 9.543h104.108c.625 0 1.076.423 1.076 1.14v57.94c0 .717-.453 1.14-1.076 1.14H11.949c-.623 0-1.076-.423-1.076-1.14V35.029c0-.715.451-1.135 1.07-1.138z"
        fontWeight="400"
        fontFamily="sans-serif"
        overflow="visible"
      ></path>
      <path d="M20.721 84.1V43.9H32.42l11.697 14.78L55.81 43.9h11.696v40.2H55.81V61.044l-11.694 14.78-11.698-14.78V84.1H20.722zm73.104 0L76.28 64.591h11.697V43.9h11.698v20.69h11.698zm0 0"></path>
    </svg>
  )
}
