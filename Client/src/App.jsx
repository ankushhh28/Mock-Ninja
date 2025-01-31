import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import DataProvider, { DataContext } from "./Context/DataProvider";

//---------------------- PUBLIC IMPORTS ONLY --------------------------

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPass = lazy(() => import("./Pages/ForgotPass"));
const InterviewerHome = lazy(() => import("./Pages/InterviewerHome"));

//---------------------- CANDIDATES IMPORTS ONLY -----------------------

const CanHome = lazy(() => import("./Candidate/Can_Home"));

//---------------------- SELECTOR IMPORTS ONLY -------------------------

const SelectorHome = lazy(() => import("./Selector/SelectorHome"));

// ---------------- CANDIDATE PROTECTED --------------------------

const CandidatePrivate = () => {
  const { account } = useContext(DataContext)
  return account.role === "Candidate" ? <Outlet/> : <Navigate to = {"/Login"}/>
}

// ---------------- INTERVIEWER PROTECTED --------------------------

const InterviewerPrivate = () => {
  const { account } = useContext(DataContext)
  return account.role === "Interviewer" ? <Outlet/> : <Navigate to = {"/Login"}/>
}

  const App = () => {

  return (
    <>
    <DataProvider>
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
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot-password" element={<ForgotPass />} />
        <Route path="/Interviewer/Home" element={<InterviewerHome />} />

{/*---------------- STUDENT ROUTES (WITH LOGIN) ----------------*/}

      <Route element={<CandidatePrivate/>}>
        <Route path="/Candidate/Home" element={<CanHome />} />
      </Route>

{/*---------------- SELECTOR ROUTES (WITH LOGIN) ----------------*/}
      
      <Route element={<InterviewerPrivate/>}>
        <Route path="/Interviewer/Home" element={<SelectorHome />} />
      </Route>


        </Routes>
        </Suspense>
      </BrowserRouter>
    </DataProvider>
    </>
  );
};

export default App;
