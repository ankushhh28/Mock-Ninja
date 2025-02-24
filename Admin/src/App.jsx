import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

const Home = lazy(() => import("./Pages/Home"));


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Suspense
        fallback={
          <Box className="h-[100vh] flex justify-center items-center text-purple-400">
            <CircularProgress />
          </Box>
        }
      >
        <Routes>

          <Route path="/" element={<Home />} />
            
        </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  );
};

export default App;
