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
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from 'react'
import { Spinner } from '@/components/ui/spinner'
import { formatTime } from '@/lib/utils/helper'
import { Title } from './title'

interface AudioPlayerProps {
  src: string
}

function Player({ src }: AudioPlayerProps) {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [title, setTitle] = useState<string>('')
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const isRepeatRef = useRef(isRepeat)
  const audioRef = useRef<HTMLAudioElement>(null)

  const cleanupCoverUrl = useCallback((url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url)
    }
  }, [])

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
    let isCancelled = false

    async function fetchMetadata() {
      try {
        setIsLoading(true)
        setTitle('')
        setCoverUrl((prevUrl) => {
          cleanupCoverUrl(prevUrl)
          return null
        })

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
        }

        setTitle(metadata.common.title || 'Unknown title')
      } catch (err) {
        console.error('Failed to fetch audio metadata:', err)
        setTitle('Unknown title')
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchMetadata()

    return () => {
      isCancelled = true
    }
  }, [src, cleanupCoverUrl])

  useEffect(() => {
    const urlToCleanup = coverUrl
    return () => {
      if (urlToCleanup) {
        cleanupCoverUrl(urlToCleanup)
      }
    }
  }, [coverUrl, cleanupCoverUrl])

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
      console.error('Failed to toggle play/pause:', err)
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
    (e: ChangeEvent<HTMLInputElement>) => {
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

      if (isInputting || isLoading) return

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
              } as CSSProperties
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
            onClick={togglePlayPause}
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

export const AudioPlayer = memo(Player)
