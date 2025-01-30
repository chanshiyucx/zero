import type { ReactNode } from 'react'
import { Command } from 'cmdk'
import { useState } from 'react'
import { CommandContext } from './contexts/command-context'

interface CommandMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
}

export const CommandMenu = ({ children, setOpen }: CommandMenuProps) => {
  const [pages, setPages] = useState<string[]>(['root'])
  const activePage = pages[pages.length - 1]

  const popPage = () => setPages((pages) => pages.slice(0, -1))
  const pushPage = (page: string) => setPages((pages) => [...pages, page])
  const toggle = () => setOpen((prev) => !prev)

  return (
    <CommandContext.Provider
      value={{ activePage, pushPage, popPage, setOpen, toggle }}
    >
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

              <Command.List className="max-h-[60vh] overflow-auto p-2">
                <Command.Empty>No results found.</Command.Empty>
                {children}
              </Command.List>
            </Command>
          </div>
        </div>
      </div>
    </CommandContext.Provider>
  )
}
