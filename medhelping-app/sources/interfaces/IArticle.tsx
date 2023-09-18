import ICategory from "./ICategory"
import IComment from "./IComment"
import IUser from "./IUser"

interface IArticle {
  id: number,
  title: string,
  image?: string,
  image2?: string,
  image3?: string,
  categories: ICategory[],
  description: string,
  anonymous_publication: boolean,
  quantity_shared: number,
  likes: number,
  userLiked: boolean,
  is_the_owner: boolean,
  created_at: string,
  updated_at: string,

  user?: IUser,
  comments: IComment[],
}

export default IArticle