import axios from "axios";

export const listRecipeService= async (payload) =>{
    const {search='' , page ,limit ,cateogory=[]}=payload
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes?search=${search}&page=${page}&limit=${limit}&${cateogory}`,
    {withCredentials:true}
  )
}

export const createRecipeService = async (data) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes`,
   data,
    {withCredentials:true}
  );
