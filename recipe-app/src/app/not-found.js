
"use client"
import React from 'react'
import Image from 'next/image'
import notFoundPage from "../assets/images/404_error-h.png"
import { Box } from '@mui/material'
const NotFoundPage = () => {
  return (
    <Box sx={{display:'flex' ,justifyContent:'center' ,height:"100vh" , width:"100vw"}}>
    <Image
    src={notFoundPage}
    height={1000}
    alt='not found'
    />
    </Box>
  )
}

export default NotFoundPage