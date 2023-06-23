import * as SecureStore from 'expo-secure-store'
import { TOKEN_STORAGE } from '@storage/storageConfig'

export const storageTokenSave = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_STORAGE, token);
}

export const storageTokenGet = async () => {
  const storage = await SecureStore.getItemAsync(TOKEN_STORAGE);
  const token = storage ? storage : null;
  return token;
}