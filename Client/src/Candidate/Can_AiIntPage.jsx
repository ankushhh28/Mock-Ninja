import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";
import axios from "axios";
import { Alert, Box, CircularProgress, Snackbar, Typography } from '@mui/material';

const Can_AiIntPage = () => {

  const { backendUrl, account } = useContext(DataContext);

// -------------- Fetching Mock ID in URL -------------------------

  const params = useParams();
  const mockId = params.mockID;

// -------------------- USE STATES -------------------------------

  const [questions, setQuestions] = useState([]);
  const [modalMsg, setModalMsg] = useState({ open: false, msg: "", severity: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

// ----------- Fetching Questions from Database -------------------

  useEffect(() => {
    const fetchingQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/Can/fetching-Generate-Questions`, {
          params: { mockID: mockId, email: account.email, role: account.role },
          headers: {
            Authorization: `Bearer ${account.accessToken}`
          }
        });
        if (response.status === 200) {
          const questionsArray = Array.isArray(response.data.questions)
            ? response.data.questions
            : response.data.questions
            .replace(/[\[\]{}":.\b]|question|\b\d+\b/g, "")
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");
          setQuestions(questionsArray);
        }
      } catch (error) {
        setModalMsg({
          open: true,
          msg: error.response?.data?.message || "Check your Connection! try again later",
          severity: "error",
        });
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchingQuestions();
  }, [mockId]);
  

  return (
    <>
      {error ? (
        <>
        </>
      ) : loading ? (
        <Box className="h-screen w-screen flex items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <>
        <Typography className='text-center text-5xl mb-24 mt-4 text-red-500 font-bold'>Pehle Sikh Toh le kuch</Typography>
        <Box p={3}>
          {questions.map((ques, index) => (
            <Typography key={index} variant="h6" gutterBottom>
              {ques}
            </Typography>
          ))}
        </Box>
        </>
      )}

{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}

      <Snackbar
        open={modalMsg.open}
        autoHideDuration={3000}
        onClose={() => setModalMsg({ ...modalMsg, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setModalMsg({ ...modalMsg, open: false })}
          severity={modalMsg.severity}
          sx={{ width: "100%" }}
        >
          <b>{modalMsg.msg}</b>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Can_AiIntPage;
