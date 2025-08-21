'use client'

import { type AudioHTMLAttributes, type DetailedHTMLProps } from 'react'
import { AudioPlayer } from '@/components/ui/audio-player'

export function Audio(
  props: DetailedHTMLProps<
    AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement
  >,
) {
  if (!props.src) return null
  return <AudioPlayer src={props.src as string} />
}
