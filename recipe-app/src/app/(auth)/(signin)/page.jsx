"use client";
import React from "react";
import Input from "../../../components/input/input";
import { Box, Button, Typography, TextField } from "@mui/material";
import style from "./signin.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormControl } from "@mui/material";
import google from "../../../assets/images/google.png";
import facebook from "../../../assets/images/facebook.png";
import apple from "../../../assets/images/apple.png";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { signInUser } from "@/features/auth/auth.action";
import { Password } from "@mui/icons-material";
import { redirect } from "next/navigation";

const SignIn = () => {
  const formSchema = z.object({
    Password: z
      .string()
      .min(1, "Enter valid Password")
      .regex(
        new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/),
        "Enter valid Password"
      ),
    Email: z.string().email("Enter valid Email").min(1),
  });
  const dispatch = useDispatch();
  const {
    control,
    getValues,
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(signInUser({ email: data.Email, password: data.Password }));
    reset();
    redirect("/home");
  };

  return (
    <FormControl className={style["form"]}>
      <Box className={style["upper-texts"]}>
        <Typography sx={{ fontSize: "20px" }}>Welcome to Todo</Typography>
        <Box className={style["signup-link"]}>
          <Typography sx={{ fontSize: "16px", color: "#8D8D8D" }}>
            No Account ?
          </Typography>
          <Link
            style={{
              color: "#B87514",
              fontSize: "16px",
              textDecoration: "none",
            }}
            href="/signup"
          >
            Sign up
          </Link>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontSize: "55px",
            marginLeft: "44px",
            fontWeight: "medium",
            marginBottom: "20px",
          }}
        >
          Sign in
        </Typography>
      </Box>
      <Box sx={{ width: "90%" }}>
        <Typography
          sx={{ fontSize: "16px", marginTop: "10px", marginBottom: "3px" }}
        >
          Enter your email address
        </Typography>
        <Input
          width="100%"
          lable={"Email"}
          register={register}
          feildName="Email"
          errors={errors}
        ></Input>
        <Typography
          sx={{ fontSize: "16px", marginTop: "10px", marginBottom: "3px" }}
        >
          Enter your password
        </Typography>
        <Input
          width="100%"
          lable={"Password"}
          register={register}
          feildName="Password"
          errors={errors}
        ></Input>
      </Box>

      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#E48700",
          width: "90%",
          height: "54px",
          borderRadius: "10px",
          textTransform: "none",
          marginTop: "20px",
        }}
      >
        Sign in
      </Button>
      <Box
        sx={{
          color: "#ABABAB",
          fontSize: "16px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        OR
      </Box>
      <Box className={style["third-party-signin"]}>
        <Image
          src={google}
          alt="google"
          style={{ width: "250px", height: "50px" }}
        />
        <Image
          src={facebook}
          alt="facebook"
          style={{ width: "60px", height: "50px" }}
          height="50px"
          width="60px"
        />
        <Image
          src={apple}
          alt="apple"
          style={{ width: "60px", height: "50px" }}
        />
      </Box>
    </FormControl>
  );
};

export default SignIn;
