import ICareUnit from "./ICareUnit"
import IComment from "./IComment"
import IUser from "./IUser"

interface IShift {
  id: number
  city: string
  date: string
  entry_time: string
  out_time: string
  value?: string
  payment_method?: string
  description: string
  anonymous_publication: boolean
  is_the_owner: boolean
  created_at: string
  updated_at: string

  user?: IUser
  care_unit: ICareUnit
  comments: IComment[],
}

export default IShift