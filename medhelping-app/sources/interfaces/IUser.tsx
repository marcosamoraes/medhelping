import IUserAddress from "./IUserAddress"
import IUserInfo from "./IUserInfo"

interface IUser {
  id: number
  name: string
  email: string
  whatsapp: string
  image?: string
  likes: number
  articles_shared: number
  articles_commented: number
  quantity_articles: number
  created_at: string
  updated_at: string

  address: IUserAddress
  infos: IUserInfo
}

export default IUser