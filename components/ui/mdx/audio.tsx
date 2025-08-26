'use client'

import { type ComponentPropsWithoutRef } from 'react'
import { AudioPlayer } from '@/components/ui/audio-player'

export function Audio(props: ComponentPropsWithoutRef<'audio'>) {
  if (!props.src) return null
  return <AudioPlayer src={props.src as string} />
}
