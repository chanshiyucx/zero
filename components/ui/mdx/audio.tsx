import { type AudioHTMLAttributes, type DetailedHTMLProps } from 'react'
import { AudioPlayer } from '@/components/ui/audio-player'

export function Audio(
  props: DetailedHTMLProps<
    AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement
  >,
) {
  return <AudioPlayer src={props.src as string} />
}
