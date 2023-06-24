import ICategory from "./ICategory"
import IUser from "./IUser"

interface IArticle {
  id: number,
  title: string,
  image?: string,
  categories: ICategory[],
  description: string,
  anonymous_publication: boolean,
  quantity_shared: number,
  likes: number,
  created_at: string,
  updated_at: string,

  user?: IUser,
}

export default IArticle