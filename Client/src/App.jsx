import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import DataProvider, { DataContext } from "./Context/DataProvider";
import CanDataProvider, { CanDataContext } from "./Context/CanDataProvider";
import Test from "./Candidate/Component/test";
import Resume from "./Candidate/Component/Resume";

//-------------------------------- PUBLIC IMPORTS ONLY --------------------------

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPass = lazy(() => import("./Pages/ForgotPass"));
const InterviewerHome = lazy(() => import("./Pages/InterviewerHome"));

//------------------------------- CANDIDATES IMPORTS ONLY -----------------------

const CanHome = lazy(() => import("./Candidate/Can_Home"));
const CanAiMock = lazy(() => import("./Candidate/Can_AiMock"));
const CanMock = lazy(() => import("./Candidate/Can_Mock"));
const CanATS = lazy(() => import("./Candidate/Can_ATS"));
const CanProfile = lazy(() => import("./Candidate/Can_Profile"));
const CanAiIntPage = lazy(() => import("./Candidate/Can_AiIntPage"));

//------------------------------- SELECTOR IMPORTS ONLY -------------------------

const SelectorHome = lazy(() => import("./Selector/SelectorHome"));

// ------------------------------ CANDIDATE PROTECTED ---------------------------

const CandidatePrivate = () => {
  const { account } = useContext(DataContext)
  return account.role === "Candidate" ? <Outlet/> : <Navigate to = {"/Login"}/>
}

const CandidateAiInterviewHomePrivate = () => {
  const { questionGenerated } = useContext(CanDataContext)
  return questionGenerated ? <Outlet/> : <Navigate to = {"/Candidate/AI/Mock"}/>
}

// ------------------------------ INTERVIEWER PROTECTED --------------------------

const InterviewerPrivate = () => {
  const { account } = useContext(DataContext)
  return account.role === "Interviewer" ? <Outlet/> : <Navigate to = {"/Login"}/>
}

  const App = () => {

  return (
    <>
    <DataProvider>
      <CanDataProvider>
      <BrowserRouter>

        <Suspense fallback={
        <Box className="h-[100vh] flex justify-center items-center text-purple-400">
        <CircularProgress />
        </Box>
        }>

        <Routes>

{/*-------------------------- PUBLIC ROUTES (WITHOUT LOGIN) ----------------*/}

        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact-us" element={<ContactUs />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot-password" element={<ForgotPass />} />
        <Route path="/Interviewer-Home" element={<InterviewerHome />} />
        <Route path="/test" element={<Test />} />
        <Route path="/Resume" element={<Resume />} />

{/*-------------------------- STUDENT ROUTES (WITH LOGIN) ----------------*/}

      <Route element={<CandidatePrivate/>}>
        <Route path="/Candidate/Home" element={<CanHome />} />
        <Route path="/Candidate/AI/Mock" element={<CanAiMock />} />
        <Route path="/Candidate/Mock" element={<CanMock />} />
        <Route path="/Candidate/ATS" element={<CanATS />} />
        <Route path="/Candidate/Profile" element={<CanProfile />} />
        <Route element={<CandidateAiInterviewHomePrivate/>}>
          <Route path="/Candidate/Ai/Interview-Room" element={<CanAiIntPage />} />
        </Route>
      </Route>

{/*-------------------------- SELECTOR ROUTES (WITH LOGIN) ----------------*/}
      
      <Route element={<InterviewerPrivate/>}>
        <Route path="/Interviewer/Home" element={<SelectorHome />} />
      </Route>


        </Routes>
        </Suspense>
      </BrowserRouter>
      </CanDataProvider>
    </DataProvider>
    </>
  );
};

export default App;
