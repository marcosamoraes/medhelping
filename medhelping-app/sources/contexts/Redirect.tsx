import { ReactNode, createContext, useState } from "react"

type RedirectContextDataProps = {
  path: string
  id: number
  setPath: (path: string) => void
  setId: (id: number) => void
  deleteRedirectUrl: () => void
}

type RedirectProviderProps = {
  children: ReactNode
}

export const RedirectContext = createContext<RedirectContextDataProps>({} as RedirectContextDataProps)

export function RedirectProvider ({ children }: RedirectProviderProps) {
  const [ path, setPath ] = useState<string>('')
  const [ id, setId ] = useState<number>(0)

  const deleteRedirectUrl = () => {
    setPath('')
    setId(0)
  }

  return (
    <RedirectContext.Provider value={{ 
      path,
      id,
      setPath,
      setId,
      deleteRedirectUrl
    }}>
      {children}
    </RedirectContext.Provider>
  )
}