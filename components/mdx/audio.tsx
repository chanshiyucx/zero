import { type ComponentPropsWithoutRef } from 'react'
import { AudioPlayer } from '@/components/audio-player'

export function Audio(props: ComponentPropsWithoutRef<'audio'>) {
  if (!props.src) return null
  return <AudioPlayer src={props.src as string} />
}
