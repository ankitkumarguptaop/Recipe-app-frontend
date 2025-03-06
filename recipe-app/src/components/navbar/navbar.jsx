import React from "react";
import { AppBar, Box, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h6">Ankit Kumar Gupta</Typography>
        <Button color="inherit">Logout</Button>
      </Box>
    </AppBar>
  );
};

export default Navbar;
