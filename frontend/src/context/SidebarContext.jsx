import { createContext, useContext, useMemo, useState } from 'react'

const SidebarContext = createContext(null)

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  const value = useMemo(
    () => ({
      isOpen,
      toggleSidebar,
    }),
    [isOpen],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}
