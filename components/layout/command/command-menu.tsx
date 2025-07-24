import { Command } from 'cmdk'
import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useActivePage, useCommandStore } from '@/store/command'

interface CommandMenuProps {
  children: ReactNode
}

export const CommandMenu = ({ children }: CommandMenuProps) => {
  const { pages, popPage, setOpen, open } = useCommandStore()
  const activePage = useActivePage()
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
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [activePage, open])

  return (
    <div
      className="bg-muted/20 fixed inset-0 z-50 backdrop-blur-xs"
      onClick={() => setOpen(false)}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-[45vw] min-w-xl max-md:w-[96vw] max-md:min-w-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Command
            className="bg-surface rounded-lg shadow-lg"
            onKeyDown={handleKeyDown}
          >
            <div className="border-b p-4">
              <Command.Input
                autoFocus
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
        </div>
      </div>
    </div>
  )
}
