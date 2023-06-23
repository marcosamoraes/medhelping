import * as SecureStore from 'expo-secure-store'
import IUser from '@interfaces/IUser'
import { USER_STORAGE } from '@storage/storageConfig'

export const storageUserSave = async (user: IUser) => {
  await SecureStore.setItemAsync(USER_STORAGE, JSON.stringify(user))
}

export const storageUserGet = async () => {
  const storage = await SecureStore.getItemAsync(USER_STORAGE)
  const user: IUser = storage ? JSON.parse(storage) : null
  return user
}