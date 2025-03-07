import React from "react";
import { AppBar, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/auth.slice";

const Navbar = () => {
  const dispatch =useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser);
console.log('✌️currentUesr --->', currentUser);

  return (
    <AppBar position="static">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h6">{currentUser.user.name}</Typography>
        <Button color="inherit" onClick={()=>dispatch(logout())}>Logout</Button>
      </Box>
    </AppBar>
  );
};

export default Navbar;
