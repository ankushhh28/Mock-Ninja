import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

//------- PUBLIC IMPORTS ONLY ---------------

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const RegisterType = lazy(() => import("./Pages/RegisterType"));
const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPass = lazy(() => import("./Pages/ForgotPass"));

//------- CANDIDATES IMPORTS ONLY ---------------

const CanHome = lazy(() => import("./Candidate/Can_Home"));

//------- SELECTOR IMPORTS ONLY ---------------

const SelectorHome = lazy(() => import("./Selector/SelectorHome"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={
        <Box className="h-[100vh] flex justify-center items-center text-purple-400">
        <CircularProgress />
        </Box>
        }>
          <Routes>

{/*---------------- PUBLIC ROUTES (WITHOUT LOGIN) ----------------*/}

            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact-us" element={<ContactUs />} />
            <Route path="/Register" element={<RegisterType />} />
            <Route path="/SignUp" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Forgot-password" element={<ForgotPass />} />

{/*---------------- STUDENT ROUTES (WITH LOGIN) ----------------*/}

            <Route path="/Candidate/Home" element={<CanHome />} />

{/*---------------- SELECTOR ROUTES (WITH LOGIN) ----------------*/}

            <Route path="/Selector/Home" element={<SelectorHome />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
