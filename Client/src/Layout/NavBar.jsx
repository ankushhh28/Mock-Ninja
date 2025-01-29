import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

import Logo from "../assets/Logo.png"

const NavBar = () =>  {

  return (
    <>

    <AppBar>
      <Toolbar className="bg-[#8667F2]">

        <Box className="flex items-center gap-1">

          <img 
          className="h-[70px]"
          src={Logo} alt="Mocn Ninja Logo" />

          <Typography className="text-[2rem] font-[roboto] font-extrabold tracking-tight">
            Mock Ninja
          </Typography>

        </Box>

      </Toolbar>
    </AppBar>

    </>
  )
}

export default NavBar