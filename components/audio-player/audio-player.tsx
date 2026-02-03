'use client'

import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  RepeatOnceIcon,
  RewindIcon,
} from '@phosphor-icons/react/dist/ssr'
import parse from 'id3-parser'
import Image from 'next/image'
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Spinner } from '@/components/spinner'
import { formatTime } from '@/lib/utils/helper'
import { Title } from './title'

interface AudioPlayerProps {
  src: string
}

const StepDuration = 5

export function AudioPlayer({ src }: AudioPlayerProps) {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [title, setTitle] = useState<string>('')
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const isRepeatRef = useRef(isRepeat)
  const audioRef = useRef<HTMLAudioElement>(null)

  const cleanupCoverUrl = (url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url)
    }
  }

  useEffect(() => {
    isRepeatRef.current = isRepeat
  }, [isRepeat])

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
      if (isRepeatRef.current) {
        audio.currentTime = 0
        audio.play().catch(console.error)
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
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function fetchMetadata() {
      try {
        setIsLoading(true)
        setTitle('')
        setCoverUrl((prevUrl) => {
          cleanupCoverUrl(prevUrl)
          return null
        })

        const response = await fetch(src, {
          headers: {
            Range: 'bytes=0-65536', // 64 * 1024
          },
          signal,
        })

        if (!response.ok && response.status !== 206) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const arrayBuffer = await response.arrayBuffer()

        if (signal.aborted) return

        const tags = parse(new Uint8Array(arrayBuffer))
        if (tags) {
          if (tags?.image?.data) {
            const { data, mime } = tags.image

            const blob = new Blob([new Uint8Array(data)], { type: mime })
            const url = URL.createObjectURL(blob)
            setCoverUrl(url)
          }

          setTitle(tags?.title ?? 'Unknown title')
        } else {
          setTitle('Unknown title')
        }
      } catch (error) {
        if (signal.aborted) return
        console.error('Failed to fetch audio metadata:', error)
        setTitle('Unknown title')
      } finally {
        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchMetadata().catch(console.error)

    return () => {
      controller.abort()
    }
  }, [src])

  useEffect(() => {
    const urlToCleanup = coverUrl
    return () => {
      if (urlToCleanup) {
        cleanupCoverUrl(urlToCleanup)
      }
    }
  }, [coverUrl])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
    } catch (err) {
      console.error('Failed to toggle play/pause:', err)
    }
  }

  const toggleRepeat = () => {
    setIsRepeat((prev) => !prev)
  }

  const handleBack = () => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Math.max(0, audio.currentTime - StepDuration)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleForward = () => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Math.min(duration, audio.currentTime + StepDuration)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const newTime = (Number(e.target.value) / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    const isInputting =
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable

    if (isInputting || isLoading) return

    event.preventDefault()

    const audio = audioRef.current
    if (!audio) return

    switch (event.code) {
      case 'ArrowLeft': {
        const newTime = Math.max(0, audio.currentTime - StepDuration)
        audio.currentTime = newTime
        setCurrentTime(newTime)
        break
      }
      case 'ArrowRight': {
        const newTime = Math.min(duration, audio.currentTime + StepDuration)
        audio.currentTime = newTime
        setCurrentTime(newTime)
        break
      }
      case 'ArrowUp':
        if (isPlaying) {
          audio.pause()
        } else {
          audio.play().catch(console.error)
        }
        break
      case 'ArrowDown':
        setIsRepeat((prev) => !prev)
        break
      default:
        break
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-surface sticky top-0 z-10 w-full overflow-hidden rounded-md">
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
            aria-label="Audio progress"
          />

          <div className="flex h-10 min-w-0 items-center justify-between gap-2">
            <Title title={title} />

            <button
              onClick={handleBack}
              className="player-button hidden h-10 w-10 max-md:flex"
              disabled={isLoading}
              aria-label="Rewind 10 seconds"
            >
              <RewindIcon size={24} weight="duotone" />
            </button>

            <span className="flex-shrink-0 text-sm whitespace-nowrap">
              {formatTime(Math.min(currentTime, duration))} /{' '}
              {formatTime(duration)}
            </span>

            <button
              onClick={handleForward}
              className="player-button hidden h-10 w-10 max-md:flex"
              disabled={isLoading}
              aria-label="Forward 10 seconds"
            >
              <FastForwardIcon size={24} weight="duotone" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2">
          <button
            onClick={handleBack}
            className="player-button max-md:hidden"
            disabled={isLoading}
            aria-label="Rewind 10 seconds"
          >
            <RewindIcon size={36} weight="duotone" />
          </button>

          <button
            onClick={() => void togglePlayPause()}
            className="player-button"
            disabled={isLoading}
            aria-label={isPlaying ? 'Pause' : 'Play'}
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
            aria-label="Forward 10 seconds"
          >
            <FastForwardIcon size={36} weight="duotone" />
          </button>

          <button
            onClick={toggleRepeat}
            className="player-button max-md:hidden"
            disabled={isLoading}
            aria-label={isRepeat ? 'Disable repeat' : 'Enable repeat'}
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
