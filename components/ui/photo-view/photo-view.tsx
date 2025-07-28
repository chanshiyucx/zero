import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { type ImageProps } from '@/components/ui/mdx/image'
import { Spinner } from '@/components/ui/spinner'
import { formatFileSize } from '@/lib/utils/helper'

const isBlobSrc = (src: string | Blob | undefined): src is string => {
  return typeof src === 'string' && src.startsWith('blob:')
}

export function PhotoView({
  src,
  originalsrc,
  alt,
  width,
  height,
}: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageSize, setImageSize] = useState(0)
  const [loadSize, setLoadSize] = useState(0)
  const [zoomState, setZoomState] = useState(0) // 0 initial, 1 zooming, 2 preview
  const [bounds, setBounds] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)

  const [naturalDimensions, setNaturalDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

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

        setImageSize(total)
        setLoadSize(0)

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
              setLoadSize(receivedLength)
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
        const imageUrl = URL.createObjectURL(blob)

        return imageUrl
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
    if (!bounds || !naturalDimensions)
      return { scale: 1, translateX: 0, translateY: 0 }

    const maxWidth = window.innerWidth
    const maxHeight = window.innerHeight

    const aspectRatio = naturalDimensions.width / naturalDimensions.height
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
    const curScale = targetWidth / bounds.width
    if (curScale > maxScale) {
      targetWidth = (targetWidth / curScale) * maxScale
      targetHeight = (targetHeight / curScale) * maxScale
    }

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const originalCenterX = bounds.x + targetWidth / 2
    const originalCenterY = bounds.y + targetHeight / 2
    const previewCenterX = centerX
    const previewCenterY = centerY

    const targetX = previewCenterX - originalCenterX - window.scrollX
    const targetY = previewCenterY - originalCenterY - window.scrollY
    const originalX = 0
    const originalY = -window.scrollY

    return {
      width: targetWidth,
      height: targetHeight,
      targetX,
      targetY,
      originalX,
      originalY,
    }
  }, [bounds, originalsrc, naturalDimensions])

  const handleClose = useCallback(
    (e?: MouseEvent) => {
      if (e) {
        e.stopPropagation()
      }

      if (isOpen && zoomState === 2) {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }

        setIsOpen(false)
        setIsLoading(false)
        setImageSize(0)
        setLoadSize(0)
      }
    },
    [isOpen, zoomState],
  )

  const handleAnimationComplete = useCallback(() => {
    const newZoomState = isOpen ? 2 : 0
    setZoomState(newZoomState)
  }, [isOpen])

  const handleImageClick = useCallback(async () => {
    if (!imageRef.current) return
    if (isOpen) {
      if (zoomState === 2) {
        handleClose()
      }
      return
    }

    const rect = imageRef.current.getBoundingClientRect()
    setBounds({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    })

    const naturalDims = {
      width: imageRef.current.naturalWidth,
      height: imageRef.current.naturalHeight,
    }
    setNaturalDimensions(naturalDims)

    setTimeout(() => {
      setIsOpen(true)
      setZoomState(1)
    }, 200)

    if (originalsrc && originalsrc !== currentSrc && !isBlobSrc(currentSrc)) {
      setIsLoading(true)
      setLoadSize(0)
      setImageSize(0)

      try {
        const imageUrl = await loadImageWithProgress(originalsrc)

        setCurrentSrc(imageUrl)
        setIsLoading(false)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Failed to load original image:', error)
          setIsLoading(false)
        }
      }
    }
  }, [
    isOpen,
    originalsrc,
    zoomState,
    currentSrc,
    loadImageWithProgress,
    handleClose,
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen, handleClose])

  const progress = imageSize > 0 ? Math.round((loadSize / imageSize) * 100) : 0
  const previewTransform = getPreviewTransform()

  const animate = isOpen
    ? {
        width: previewTransform.width,
        height: previewTransform.height,
        x: previewTransform.targetX,
        y: previewTransform.targetY,
      }
    : {
        width: bounds?.width,
        height: bounds?.height,
        x: previewTransform.originalX,
        y: previewTransform.originalY,
      }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-100 backdrop-blur-xs"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && isLoading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-base fixed right-1/2 bottom-6 z-102 flex min-w-48 translate-x-1/2 flex-col flex-row items-center gap-3 rounded-xl px-4 py-3 text-sm whitespace-nowrap shadow-lg backdrop-blur-xs"
          >
            <span className="border-t-text border-overlay h-4 w-4 animate-spin rounded-full border-2"></span>
            <span className="inline-flex flex-col gap-1">
              <span>Unveiling the full image…</span>
              <span className="inline-flex justify-between pr-2">
                <span>{progress}%</span>
                <span>
                  {formatFileSize(loadSize)} / {formatFileSize(imageSize)}
                </span>
              </span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>

      <span
        className="relative block"
        style={{ width: `${bounds?.width}px`, height: `${bounds?.height}px` }}
      >
        <motion.img
          ref={imageRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          draggable={false}
          className={clsx(
            'm-0! origin-center cursor-pointer transition-opacity duration-300 will-change-transform',
            zoomState !== 0
              ? 'fixed z-101 rounded-none!'
              : 'relative transform-none!',
            isReady ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          animate={animate}
          transition={{
            type: 'tween',
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onLoad={() => setIsReady(true)}
          onError={() => setIsReady(false)}
          onClick={handleImageClick}
          onAnimationComplete={handleAnimationComplete}
        />

        <span className="bg-overlay absolute inset-0 -z-10 flex items-center justify-center rounded-lg">
          {!isReady && <Spinner />}
        </span>
      </span>
    </>
  )
}
