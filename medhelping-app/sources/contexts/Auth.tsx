import { ReactNode, createContext, useCallback, useEffect, useState } from "react"
import IUser from "@interfaces/IUser"
import { api } from '@services/api'
import { storageUserGet, storageUserSave } from "@storage/storageUser"
import { storageTokenGet, storageTokenSave } from "@storage/storageToken"
import { useNavigation } from "expo-router"
import { Alert } from "react-native"

type AuthContextDataProps = {
  user: IUser
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  loadUserData: () => Promise<void>
  logout: () => void
  loading: boolean
  activeLoading: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const activeLoading = () => {
    setLoading(true)
  }

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const { data } = await api.post('/register', { name, email, password, password_confirmation: passwordConfirmation })
      
      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
        setToken(data.token)
        storageTokenSave(data.token)
        Alert.alert('Sucesso', 'Cadastro criado com êxito', [{ text: 'OK' }])
      }
    } catch (error: any) {
      throw error.response.data.message ?? "Falha ao realizar cadastro."
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
      }
    } catch (error: any) {
      throw error.response.data.message ?? "Falha ao realizar login."
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
  }, [])

  useEffect(() => {
    loadUserData()
  }, [token])

  return (
    <AuthContext.Provider value={{ 
      user, 
      register, 
      signIn, 
      loadUserData, 
      logout, 
      loading, 
      activeLoading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}