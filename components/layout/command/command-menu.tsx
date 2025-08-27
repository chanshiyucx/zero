import { Command } from 'cmdk'
import {
  AnimatePresence,
  m,
  type Transition,
  type Variants,
} from 'framer-motion'
import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useActivePage, useCommand } from '@/stores/use-command'
import { useDevice } from '@/stores/use-device'

interface CommandMenuProps {
  open: boolean
  children: ReactNode
}

const transition: Transition = { type: 'spring', stiffness: 500, damping: 30 }

const backdropVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
}

export const CommandMenu = ({ children }: CommandMenuProps) => {
  const { pages, popPage, setOpen, open } = useCommand()
  const activePage = useActivePage()
  const isMobile = useDevice((s) => s.isMobile)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (pages.length > 1) {
          popPage()
        } else {
          setOpen(false)
        }
      }
    },
    [pages.length, popPage, setOpen],
  )

  useEffect(() => {
    if (open && inputRef.current && !isMobile) {
      inputRef.current.focus()
    }
  }, [activePage, open, isMobile])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="bg-muted/20 fixed inset-0 z-100 backdrop-blur-xs"
          variants={backdropVariants}
          transition={transition}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <m.div
              className="relative w-[45vw] min-w-xl max-md:w-[96vw] max-md:min-w-auto"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              transition={transition}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Command
                className="bg-surface rounded-lg shadow-lg"
                onKeyDown={handleKeyDown}
              >
                <div className="border-b p-4">
                  <Command.Input
                    autoFocus={!isMobile}
                    ref={inputRef}
                    className="w-full border-none bg-transparent outline-hidden"
                    placeholder="Type a command or search..."
                  />
                </div>

                <Command.List className="max-h-[60vh] overflow-auto p-3">
                  <Command.Empty>No results found.</Command.Empty>
                  {children}
                </Command.List>
              </Command>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
