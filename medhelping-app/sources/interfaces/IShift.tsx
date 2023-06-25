import ICareUnit from "./ICareUnit"
import IUser from "./IUser"

interface IShift {
  id: number,
  city: string,
  date: string,
  entry_time: string,
  out_time: string,
  value?: string,
  payment_method?: string,
  description: string,
  anonymous_publication: boolean,
  created_at: string,
  updated_at: string,

  user?: IUser,
  care_unit: ICareUnit
}

export default IShift