import { ReactNode, createContext, useCallback, useEffect, useState } from "react"
import IUser from "@interfaces/IUser"
import { api } from '@services/api'
import { storageUserGet, storageUserSave } from "@storage/storageUser"
import { storageTokenGet, storageTokenSave } from "@storage/storageToken"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

export type AuthContextDataProps = {
  user: IUser
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  loadUserData: () => Promise<void>
  logout: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const { data } = await api.post('/register', { name, email, password, password_confirmation: passwordConfirmation })
      
      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
        setToken(data.token)
        storageTokenSave(data.token)
        Alert.alert('Sucesso', 'Cadastro criado com êxito', [{ text: 'OK' }])
        router.push('../main-pages/home')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/login', { email, password })
      
      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
        setToken(data.token)
        storageTokenSave(data.token)
        router.push('../main-pages/home')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loadUserData = async () => {
    const storageUser = await storageUserGet()

    if (storageUser) setUser(storageUser)

    const storageToken = await storageTokenGet()

    if (storageToken) {
      setToken(storageToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`
    }
  }

  const logout = useCallback(() => {
    setUser({} as IUser)
    storageUserSave({} as IUser)
    setToken('')
    storageTokenSave('')
    router.push('/login');
  }, [])

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      register, 
      signIn, 
      loadUserData, 
      logout, 
      loading, 
      setLoading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}