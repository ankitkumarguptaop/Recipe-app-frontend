import { Box, Typography } from "@mui/material";
import style from "./auth.module.css"

export default function AuthLayout({ children }) {
  return (
    <>
      <Box className={style["parent-container"]}>
        <Box className={style["left-container"]}> </Box>
        <Box className={style["center-container"]}>
        {children}
        </Box>
        <Box className={style["right-container"]}> </Box>
      </Box>
    </>
  );
}