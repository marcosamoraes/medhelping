import { useNavigation } from 'expo-router'
import { createContext, useEffect, useState } from 'react'

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: (loading: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType)

export default function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('blur', () => {
      setIsOpen(false)
    })
  }, [navigation])

  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>
}