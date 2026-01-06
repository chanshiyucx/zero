'use client'

import { CameraIcon, SlideshowIcon } from '@phosphor-icons/react/dist/ssr'
import {
  AnimatePresence,
  m,
  type Transition,
  type Variants,
} from 'framer-motion'
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import type { ImageProps } from '@/components/mdx/image'
import { Spinner } from '@/components/spinner'
import { formatFileSize } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

interface Transform {
  width: number
  height: number
  top: number
  left: number
}

interface LoadProgress {
  loaded: number
  total: number
}

enum ZoomState {
  Idle = 0,
  Zooming = 1,
  Preview = 2,
}

const transition: Transition = { type: 'spring', stiffness: 500, damping: 30 }

const backdropVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const progressVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
}

const isBlobSrc = (src: string | Blob | undefined): src is string => {
  return typeof src === 'string' && src.startsWith('blob:')
}

function Preview({ src, originalsrc, alt, width, height }: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [zoomState, setZoomState] = useState(ZoomState.Idle)
  const [transform, setTransform] = useState<Transform | null>(null)
  const [loadProgress, setLoadProgress] = useState<LoadProgress>({
    loaded: 0,
    total: 0,
  })
  const imageRef = useRef<HTMLImageElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadImageWithProgress = useCallback(
    async (url: string): Promise<string> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentLength = response.headers.get('content-length')
        const total = contentLength ? parseInt(contentLength, 10) : 0
        setLoadProgress({ loaded: 0, total })

        if (!response.body) {
          throw new Error('ReadableStream not supported')
        }

        const reader = response.body.getReader()
        const chunks: Uint8Array[] = []
        let receivedLength = 0
        let lastUpdate = 0
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (value) {
            chunks.push(value)
            receivedLength += value.length
            const now = Date.now()
            if (now - lastUpdate > 100 || receivedLength >= total) {
              setLoadProgress((prev) => ({ ...prev, loaded: receivedLength }))
              lastUpdate = now
            }
          }
        }

        const allChunks = new Uint8Array(receivedLength)
        let position = 0
        for (const chunk of chunks) {
          allChunks.set(chunk, position)
          position += chunk.length
        }

        const blob = new Blob([allChunks])
        return URL.createObjectURL(blob)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw error
        }
        console.error('Failed to load image with progress:', error)
        throw error
      }
    },
    [],
  )

  const getPreviewTransform = useCallback(() => {
    const imageElement = imageRef.current
    if (!imageElement) return
    const rect = imageElement.getBoundingClientRect()
    const { innerWidth: maxWidth, innerHeight: maxHeight } = window
    const { naturalWidth, naturalHeight } = imageElement
    const aspectRatio = naturalWidth / naturalHeight

    let targetWidth, targetHeight
    if (maxWidth / maxHeight > aspectRatio) {
      targetHeight = maxHeight
      targetWidth = targetHeight * aspectRatio
    } else {
      targetWidth = maxWidth
      targetHeight = targetWidth / aspectRatio
    }

    // Maximum zoom ratio, wiki image is 1.5x, onedrive image is 10x
    const maxScale = originalsrc ? 10 : 1.5
    const currentScale = targetWidth / rect.width
    if (currentScale > maxScale) {
      const scaleFactor = maxScale / currentScale
      targetWidth *= scaleFactor
      targetHeight *= scaleFactor
    }

    const targetTop = window.innerHeight / 2 - targetHeight / 2 - rect.top
    const targetLeft = window.innerWidth / 2 - targetWidth / 2 - rect.left

    setTransform({
      width: targetWidth,
      height: targetHeight,
      top: targetTop,
      left: targetLeft,
    })
  }, [originalsrc])

  const handleClose = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation()

      if (zoomState === ZoomState.Preview) {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }

        setIsOpen(false)
        setIsLoading(false)
        setLoadProgress({ loaded: 0, total: 0 })
      }
    },
    [zoomState],
  )

  const handleAnimationComplete = useCallback(() => {
    setZoomState(isOpen ? ZoomState.Preview : ZoomState.Idle)
  }, [isOpen])

  const handleImageClick = useCallback(async () => {
    if (zoomState === ZoomState.Preview) {
      handleClose()
    } else if (zoomState === ZoomState.Idle) {
      getPreviewTransform()
      setIsOpen(true)
      setZoomState(ZoomState.Zooming)

      if (originalsrc && originalsrc !== currentSrc && !isBlobSrc(currentSrc)) {
        setIsLoading(true)
        setLoadProgress({ loaded: 0, total: 0 })

        try {
          const imageUrl = await loadImageWithProgress(originalsrc)
          setCurrentSrc(imageUrl)
          setIsLoading(false)
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Failed to load original image:', error)
          }
        }
      }
    }
  }, [
    originalsrc,
    zoomState,
    currentSrc,
    handleClose,
    loadImageWithProgress,
    getPreviewTransform,
  ])

  // onLoad is probably not triggered when an image is loaded from the cache, so need to set the ready state manually.
  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (isBlobSrc(currentSrc)) {
        URL.revokeObjectURL(currentSrc)
      }
    }
  }, [currentSrc])

  useEffect(() => {
    document.body.style.overflow =
      zoomState === ZoomState.Idle ? 'initial' : 'hidden'
  }, [zoomState])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  const animate =
    isOpen && transform
      ? {
          width: transform.width,
          height: transform.height,
          y: transform.top,
          x: transform.left,
          borderRadius: 0,
        }
      : {}

  const progress =
    loadProgress.total > 0
      ? Math.round((loadProgress.loaded / loadProgress.total) * 100)
      : 0

  const Icon = originalsrc ? CameraIcon : SlideshowIcon

  return (
    <figure>
      <AnimatePresence>
        {isOpen && (
          <m.span
            className="fixed inset-0 z-100 backdrop-blur-xs"
            variants={backdropVariants}
            transition={transition}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && isLoading && (
          <m.span
            className="bg-base fixed right-1/2 bottom-6 z-102 flex min-w-48 translate-x-1/2 flex-col flex-row items-center gap-3 rounded-md px-4 py-3 text-sm whitespace-nowrap shadow-lg backdrop-blur-xs"
            variants={progressVariants}
            transition={transition}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <span className="border-t-text border-overlay h-4 w-4 animate-spin rounded-full border-2"></span>
            <span className="inline-flex flex-col gap-1">
              <span>Unveiling the full image…</span>
              <span className="inline-flex justify-between pr-2">
                <span>{progress}%</span>
                <span>
                  {formatFileSize(loadProgress.loaded)} /{' '}
                  {formatFileSize(loadProgress.total)}
                </span>
              </span>
            </span>
          </m.span>
        )}
      </AnimatePresence>

      <span
        className="relative block"
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <m.img
          ref={imageRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          draggable={false}
          loading="lazy"
          className={cn(
            'absolute m-0! h-full w-full max-w-none cursor-pointer object-cover transition-opacity duration-300',
            isReady ? 'opacity-100' : 'pointer-events-none opacity-0',
            zoomState === ZoomState.Idle
              ? 'z-10'
              : 'z-101 will-change-transform',
          )}
          transition={{
            type: 'tween',
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          animate={animate}
          onLoad={() => setIsReady(true)}
          onError={() => setIsReady(false)}
          onClick={() => void handleImageClick()}
          onAnimationComplete={handleAnimationComplete}
        />

        <span className="bg-overlay absolute inset-0 flex items-center justify-center rounded-md">
          {!isReady && <Spinner />}
        </span>
      </span>

      {alt && (
        <figcaption className="text-subtle my-2 block text-center text-sm italic">
          <Icon weight="duotone" className="fill-subtle mr-1 inline" />
          <span className="align-text-top">{alt}</span>
        </figcaption>
      )}
    </figure>
  )
}

export const PhotoView = memo(Preview)
