import axios from "axios";

export const signupUserService = async (data) =>{
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
    data,
  );
}

export const signinUserService = async (data) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`,
    data,
  );
