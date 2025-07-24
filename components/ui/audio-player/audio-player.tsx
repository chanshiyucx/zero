import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  RepeatOnceIcon,
  RewindIcon,
} from '@phosphor-icons/react/dist/ssr'
import { parseBlob } from 'music-metadata'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { formatTime, range } from '@/lib/utils/helper'

interface AudioPlayerProps {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [title, setTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [coverUrl, setCoverUrl] = useState<string | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedData = () => {
      setDuration(audio.duration || 0)
      setCurrentTime(audio.currentTime)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        setIsPlaying(false)
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [isRepeat])

  useEffect(() => {
    let isCancelled = false

    async function fetchMetadata() {
      try {
        setIsLoading(true)
        const response = await fetch(src)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const blob = await response.blob()
        const metadata = await parseBlob(blob)

        if (isCancelled) return

        const picture = metadata.common.picture?.[0]
        if (picture) {
          const coverBlob = new Blob([picture.data], { type: picture.format })
          const url = URL.createObjectURL(coverBlob)
          setCoverUrl(url)
        } else {
          setCoverUrl(null)
        }

        setTitle(metadata.common.title || 'Unknown title')
        setIsLoading(false)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMetadata()

    return () => {
      isCancelled = true
      if (coverUrl) {
        URL.revokeObjectURL(coverUrl)
      }
    }
  }, [src])

  useEffect(() => {
    return () => {
      if (coverUrl) {
        URL.revokeObjectURL(coverUrl)
      }
    }
  }, [coverUrl])

  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
    } catch (err) {
      console.error(err)
    }
  }, [isPlaying])

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev)
  }, [])

  const handleBack = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Math.max(0, audio.currentTime - 10)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }, [])

  const handleForward = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Math.min(duration, audio.currentTime + 10)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  const handleProgressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current
      if (!audio || !duration) return

      const newTime = (Number(e.target.value) / 100) * duration
      audio.currentTime = newTime
      setCurrentTime(newTime)
    },
    [duration],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isInputting =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      if (isInputting) return
      if (isLoading) return
      event.preventDefault()

      switch (event.code) {
        case 'ArrowLeft':
          handleBack()
          break
        case 'ArrowRight':
          handleForward()
          break
        case 'ArrowUp':
          togglePlayPause()
          break
        case 'ArrowDown':
          toggleRepeat()
          break
        default:
          break
      }
    },
    [togglePlayPause, handleBack, handleForward, toggleRepeat, isLoading],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-surface sticky top-0 w-full overflow-hidden rounded-lg">
      <audio ref={audioRef} src={src} preload="metadata" loop={false} />

      <div className="flex items-center">
        <div className="bg-overlay flex h-20 w-20 shrink-0 items-center justify-center">
          {isLoading || !coverUrl ? (
            <Spinner />
          ) : (
            <Image
              src={coverUrl}
              alt="Audio Cover"
              width={80}
              height={80}
              className="mt-0 mb-0 rounded-r-none! object-cover"
              unoptimized
            />
          )}
        </div>

        <div className="flex h-20 min-w-0 flex-1 flex-col">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercentage}
            onChange={handleProgressChange}
            className="player-progress flex-1"
            // Add 1 to avoid gaps
            style={
              {
                '--progress': `${progressPercentage + 1}%`,
              } as React.CSSProperties
            }
            disabled={isLoading || !duration}
          />

          <div className="flex h-10 min-w-0 items-center gap-2">
            <div className="flex min-w-0 flex-1 gap-4 overflow-hidden">
              {range(0, 2).map((i) => (
                <span
                  key={i}
                  className="animate-marquee-left flex shrink-0 flex-row justify-around gap-4 [--gap:1rem]"
                >
                  {title}
                </span>
              ))}
            </div>

            <span className="flex-shrink-0 text-sm whitespace-nowrap">
              {formatTime(Math.min(currentTime, duration))} /{' '}
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2">
          <button
            onClick={handleBack}
            className="player-button max-md:hidden"
            disabled={isLoading}
          >
            <RewindIcon size={36} weight="duotone" />
          </button>

          <button
            onClick={togglePlayPause}
            className="player-button"
            disabled={isLoading}
          >
            {isPlaying ? (
              <PauseIcon size={36} weight="duotone" />
            ) : (
              <PlayIcon size={36} weight="duotone" />
            )}
          </button>

          <button
            onClick={handleForward}
            className="player-button max-md:hidden"
            disabled={isLoading}
          >
            <FastForwardIcon size={36} weight="duotone" />
          </button>

          <button
            onClick={toggleRepeat}
            className="player-button max-md:hidden"
            disabled={isLoading}
          >
            {isRepeat ? (
              <RepeatIcon size={36} weight="duotone" />
            ) : (
              <RepeatOnceIcon size={36} weight="duotone" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
