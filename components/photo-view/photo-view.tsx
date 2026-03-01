'use client'

import { CameraIcon, SlideshowIcon } from '@phosphor-icons/react/dist/ssr'
import {
  AnimatePresence,
  m,
  type Transition,
  type Variants,
} from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import type { ImageProps } from '@/components/mdx/image'
import { Spinner } from '@/components/spinner'
import { formatFileSize } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

type Transform = {
  width: number
  height: number
  top: number
  left: number
}

type LoadProgress = {
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

async function loadImageWithProgress(
  url: string,
  signal: AbortSignal,
  setLoadProgress: (
    progress: LoadProgress | ((prev: LoadProgress) => LoadProgress),
  ) => void,
): Promise<string> {
  let response: Response
  try {
    response = await fetch(url, { signal })
  } catch {
    return Promise.reject(new Error('Failed to fetch image'))
  }

  if (!response.ok) {
    return Promise.reject(new Error(`HTTP error! status: ${response.status}`))
  }

  const contentLength = response.headers.get('content-length')
  const total = contentLength ? parseInt(contentLength, 10) : 0
  setLoadProgress({ loaded: 0, total })

  if (!response.body) {
    return Promise.reject(new Error('ReadableStream not supported'))
  }

  try {
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
          setLoadProgress((prev: LoadProgress) => ({
            ...prev,
            loaded: receivedLength,
          }))
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
  } catch {
    return Promise.reject(new Error('Failed to read response body'))
  }
}

export function PhotoView({
  src,
  originalsrc,
  alt,
  width,
  height,
}: ImageProps) {
  const [resolvedOriginalSrc, setResolvedOriginalSrc] = useState<string | null>(
    null,
  )
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
  const pathname = usePathname()

  const getPreviewTransform = () => {
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
  }

  const closePreview = (force = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setIsOpen(false)
    setIsLoading(false)
    setLoadProgress({ loaded: 0, total: 0 })
    if (force) {
      setZoomState(ZoomState.Idle)

      // Revoke the ObjectURL when preview is closed to prevent memory leaks
      if (resolvedOriginalSrc) {
        URL.revokeObjectURL(resolvedOriginalSrc)
        setResolvedOriginalSrc(null)
      }
    }
  }

  const handleClose = (e?: MouseEvent) => {
    e?.stopPropagation()

    if (zoomState === ZoomState.Preview) {
      closePreview()
    }
  }

  const handleAnimationComplete = () => {
    setZoomState(isOpen ? ZoomState.Preview : ZoomState.Idle)
  }

  const handleImageClick = async () => {
    if (zoomState === ZoomState.Idle) {
      getPreviewTransform()
      setIsOpen(true)
      setZoomState(ZoomState.Zooming)

      if (originalsrc && originalsrc !== src && !resolvedOriginalSrc) {
        setIsLoading(true)
        setLoadProgress({ loaded: 0, total: 0 })

        try {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort()
          }
          abortControllerRef.current = new AbortController()

          const imageUrl = await loadImageWithProgress(
            originalsrc,
            abortControllerRef.current.signal,
            setLoadProgress,
          )
          setResolvedOriginalSrc(imageUrl)
          setIsLoading(false)
        } catch {
          // do nothing
        }
      }
    } else {
      handleClose()
    }
  }

  useEffect(() => {
    if (imageRef.current?.complete) {
      requestAnimationFrame(() => setIsReady(true))
    }
  }, [])

  useEffect(() => {
    return () => {
      if (resolvedOriginalSrc) {
        URL.revokeObjectURL(resolvedOriginalSrc)
      }
    }
  }, [resolvedOriginalSrc])

  useEffect(() => {
    document.body.style.overflow =
      zoomState === ZoomState.Idle ? 'initial' : 'hidden'

    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [zoomState])

  const handlePathChange = useEffectEvent(() => {
    closePreview(true)
  })

  useEffect(() => {
    handlePathChange()
  }, [pathname])

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') {
      handleClose()
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

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
  const displaySrc = resolvedOriginalSrc ?? src

  return (
    <figure className="group relative">
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
          src={displaySrc}
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
        <figcaption className="pointer-events-none overflow-hidden">
          <div
            className={cn(
              'text-center text-sm italic select-none',
              isReady &&
                zoomState === ZoomState.Idle &&
                'group-hover:translate-y-0 group-hover:opacity-100!',
            )}
          >
            <Icon weight="duotone" className="fill-subtle mr-1 inline" />
            <span className="align-text-top">{alt}</span>
          </div>
        </figcaption>
      )}
    </figure>
  )
}
