import type { ReactNode } from 'react'
import { Command } from 'cmdk'
import { useCommandStore } from '@/store/command'

interface CommandMenuProps {
  children: ReactNode
}

export const CommandMenu = ({ children }: CommandMenuProps) => {
  const { pages, popPage, setOpen } = useCommandStore()

  return (
    <div
      className="bg-muted/20 fixed inset-0 z-50 backdrop-blur-xs"
      onClick={() => setOpen(false)}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-[45vw] max-md:w-[96vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <Command
            className="bg-surface rounded-lg shadow-lg"
            onKeyDown={(e) => {
              if (e.key === 'Escape' && pages.length > 1) {
                e.preventDefault()
                popPage()
              }
            }}
          >
            <div className="border-b p-4">
              <Command.Input
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
