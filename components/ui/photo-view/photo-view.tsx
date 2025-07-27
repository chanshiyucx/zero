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
  const [zoomState, setZoomState] = useState(0) // 0 initial, 1 zooming, 2 preview
  const [bounds, setBounds] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const getPreviewTransform = useCallback(() => {
    if (!bounds) return { scale: 1, translateX: 0, translateY: 0 }

    const maxWidth = window.innerWidth
    const maxHeight = window.innerHeight

    const aspectRatio = bounds.width / bounds.height
    let targetWidth, targetHeight

    if (maxWidth / maxHeight > aspectRatio) {
      targetHeight = maxHeight
      targetWidth = targetHeight * aspectRatio
    } else {
      targetWidth = maxWidth
      targetHeight = targetWidth / aspectRatio
    }

    // Maximum zoom ratio, wiki image is 1.5x, onedrive image is 10x
    const scale = Math.min(
      targetWidth / bounds.width,
      targetHeight / bounds.height,
      originalsrc ? 10 : 1.5,
    )

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const originalCenterX = bounds.x + bounds.width / 2
    const originalCenterY = bounds.y + bounds.height / 2

    const translateX = centerX - originalCenterX
    const translateY = centerY - originalCenterY

    return { scale, translateX, translateY }
  }, [bounds, originalsrc])

  const handleClose = useCallback(
    (e?: MouseEvent) => {
      if (e) {
        e.stopPropagation()
      }

      if (isOpen && zoomState === 2) {
        setIsOpen(false)
        setIsLoading(false)
      }
    },
    [isOpen, zoomState],
  )

  const handleAnimationComplete = useCallback(() => {
    setZoomState(isOpen ? 2 : 0)
  }, [isOpen])

  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsReady(true)
    }
  }, [src])

  const handleImageClick = useCallback(() => {
    handleClose()
    if (!imageRef.current || isOpen) return

    const rect = imageRef.current.getBoundingClientRect()
    setBounds({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    })

    setIsOpen(true)
    setZoomState(1)

    if (originalsrc && originalsrc !== src && originalsrc !== currentSrc) {
      setIsLoading(true)

      const originalImg = new Image()
      originalImg.onload = () => {
        setCurrentSrc(originalsrc)
        setIsLoading(false)
      }
      originalImg.onerror = () => {
        setIsLoading(false)
      }
      originalImg.src = originalsrc
    }
  }, [isOpen, src, originalsrc, currentSrc, handleClose])

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

  const previewTransform = getPreviewTransform()
  const animate = isOpen
    ? {
        scale: previewTransform.scale,
        x: previewTransform.translateX,
        y: previewTransform.translateY,
      }
    : {
        scale: 1,
        x: 0,
        y: 0,
      }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-base fixed right-1/2 bottom-6 z-102 flex translate-x-1/2 items-center gap-3 rounded-xl px-4 py-3 text-sm shadow-lg backdrop-blur-xs"
          >
            <span className="border-t-text border-overlay h-4 w-4 animate-spin rounded-full border-2"></span>
            <span>Unveiling the full image…</span>
          </motion.span>
        )}
      </AnimatePresence>

      <span className="relative block">
        <motion.img
          ref={imageRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          draggable={false}
          className={clsx(
            'relative origin-center cursor-pointer transition-opacity duration-300 will-change-transform',
            zoomState !== 0 ? 'z-101 rounded-none!' : '',
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
