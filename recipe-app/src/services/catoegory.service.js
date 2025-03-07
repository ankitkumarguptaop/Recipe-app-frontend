import axios from "axios";

export const listCateogoryService= async () =>
 await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/cateogories`,
    {withCredentials:true}
  )
