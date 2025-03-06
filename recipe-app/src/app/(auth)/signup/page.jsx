"use client";
import React from "react";
import Input from "../../../components/input/input";
import { Box, Button, Typography } from "@mui/material";
import style from "./signup.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormControl } from "@mui/material";
import google from "../../../assets/images/google.png";
import facebook from "../../../assets/images/facebook.png";
import apple from "../../../assets/images/apple.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { signUpUser } from "@/features/auth/auth.action";

const SignUp = () => {

    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
    } = useForm({
        defaultValues: {
            Name: "",
            Email: "",
            Password: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(signUpUser({ name: data.Name, email: data.Email, password: data.Password }))
        // reset();
    };

    return (
        <FormControl className={style["form"]}>
            <Box className={style["upper-texts"]}>
                <Typography sx={{ fontSize: "20px" }}>Welcome to Todo </Typography>
                <Box className={style["signup-link"]}>
                    <Typography sx={{ fontSize: "13px", color: "#8D8D8D" }}>
                        Have an Account ?
                    </Typography>
                    <Link
                        style={{
                            color: "#B87514",
                            fontSize: "13px",
                            textDecoration: "none",
                        }}
                        href="/"
                    >
                        Sign in
                    </Link>
                </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Typography
                    sx={{
                        fontSize: "55px",
                        marginLeft: "44px",
                        fontWeight: "medium",
                        marginBottom: "10px",
                    }}
                >
                    Sign up
                </Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
                <Typography sx={{ fontSize: "16px" }}>Enter your name</Typography>
                <Input
                    width="100%"
                    lable={"Name"}
                    register={register}
                    errors={errors}
                    pattern={/^[a-zA-Z]+([-'\s][a-zA-Z]+)*$/}
                    feildName="Name"
                ></Input>
                <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>
                    Enter your email address
                </Typography>
                <Input
                    width="100%"
                    lable={"Email"}
                    register={register}
                    feildName="Email"
                    errors={errors}
                    pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                ></Input>
                <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>
                    Enter your password
                </Typography>
                <Input
                    width="100%"
                    lable={"Password"}
                    register={register}
                    feildName="Password"
                    errors={errors}
                    pattern={/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/}
                ></Input>
            </Box>
            <Button
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
                Sign up
            </Button>
            <Box
                sx={{
                    color: "#ABABAB",
                    fontSize: "16px",
                    marginTop: "10px",
                    marginBottom: "10px",
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

export default SignUp;


