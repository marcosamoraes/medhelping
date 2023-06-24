import ICategory from "./ICategory"
import IUser from "./IUser"

interface IComment {
  id: number,
  anonymous_publication: boolean,
  message: string,
  quantity_likes: number,
  user_liked: boolean,
  is_the_owner: boolean,
  created_at: string,

  user: IUser,
  nodeComments?: IComment[],
}

export default IComment