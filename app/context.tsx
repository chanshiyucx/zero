'use client'

import type { Repository } from '@/type/github'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

interface DataProviderProps {
  children: ReactNode
  repositories: Repository[]
}

const DataContext = createContext<Repository[]>([])

export const DataProvider = ({ children, repositories }: DataProviderProps) => {
  return (
    <DataContext.Provider value={repositories}>{children}</DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext)
}
