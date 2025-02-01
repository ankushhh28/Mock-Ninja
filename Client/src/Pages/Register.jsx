import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginSlider from "../Components/LoginSlider";

const Register = () => {

  const { backendUrl } = useContext(DataContext);

  const navigate = useNavigate()

// ----------------------------------------------------------------

  const [userRole, setUserRole] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [loading, setLoading] = useState(false)

// ----------------------------------------------------------------

  const [candidateData, setCandidateData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePassword: "",
    candidateConfirmPassword: "",
    role:"Candidate"
  });

// ----------------------------------------------------------------

  const [expertData, setExpertData] = useState({
    expertName: "",
    expertOrgEmail: "",
    expertPassword: "",
    expertConfirmPassword: "",
    role:"Interviewer"
  });

// ----------------------------------------------------------------

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordVisibilitys = () => {
    setShowPasswords((prev) => !prev);
  };

// ----------------------------------------------------------------

useEffect(() => {
  setErrorMsg("")
  setLoading(false)
},[candidateData, userRole, successMsg])

// ----------------------------------------------------------------

  const handleCandidateChange = (e) => {
    const { name, value } = e.target;
    setCandidateData({ ...candidateData, [name]: value });
  };

// ----------------------------------------------------------------

  const handleCandidateSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateEmail.test(candidateData.candidateEmail)) {
      setLoading(false);
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (candidateData.candidatePassword.length < 8) {
      setLoading(false);
      setErrorMsg("Password must be 8 character long.");
      return;
    }

    if (candidateData.candidatePassword !== candidateData.candidateConfirmPassword){
      setLoading(false);
      setErrorMsg("Password Mismatched");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/Candidate/Register`,
        candidateData
      );
      if (response.status === 200) {
        setSuccessMsg(response.data.message)
        setTimeout(() => {
          navigate("/Login")
        },[1000])
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Check your connetions! Try Later");
    } finally {
      setLoading(false)
    }
  };

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

  const handleExpertChange = (e) => {
    const { name, value } = e.target;
    setExpertData({ ...expertData, [name]: value });
  };

// ----------------------------------------------------------------

  const handleExpertSubmit = async(e) => {
    e.preventDefault();

    setLoading(true)

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateEmail.test(expertData.expertOrgEmail)) {
      setLoading(false);
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (expertData.expertPassword.length < 8) {
      setLoading(false);
      setErrorMsg("Password must be 8 character long");
      return;
    }

    if (expertData.expertPassword !== expertData.expertConfirmPassword) {
      setLoading(false);
      setErrorMsg("Password Mismatched");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/Interviewer/Register`,
        expertData
      );
      if (response.status === 200) {
        setSuccessMsg(response.data.message)
        setTimeout(() => {
        navigate("/Login")
        },[1000])
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Check your connetions! Try Later");
    } finally {
      setLoading(false)
    }
  };

// ----------------------------------------------------------------

  return (
    <>
      <Box 
      className="bg-gradient-to-br from-purple-700 to-purple-200 flex h-screen w-screen items-center justify-center bg-cover px-40">
        <Box className="flex gap-4 bg-white py-8 px-4 rounded-[20px] h-[600px] shadow-xl">
          {/* ------------------------------------------------------------------------------------ */}

          <Box className="hidden md:inline-block w-[28vw] shadow-lg rounded-2xl">
            <LoginSlider />
          </Box>

{/* ------------------------------------------------------------------------------------ */}

<Box>
<Box
 className="h-full px-3 sm:px-6 w-[300px] sm:w-[350px] md:w-[400px] bg-gray-100 pt-1 rounded-[20px] flex-col shadow-lg">

  <Typography className="text-center text-[2rem] font-bold font-[roboto]">
    Sign up
  </Typography>

  {/* ------------------------------------------------------------------------------------ */}

  <Box className="flex items-center justify-between w-fit md:w-fit rounded-[30px] p-2 h-12 bg-[#E0E7FF] mt-2 mx-auto">
    <Box
      onClick={() => setUserRole(true)}
      className={`${
        userRole ? "bg-white shadow-md" : "bg-transparent"
      } flex-1 flex justify-center items-center text-nowrap p-2 rounded-3xl cursor-pointer transition-all`}
    >
      <Typography
        className={`font-bold text-sm md:text-[15px] text-black`}
      >
        Candidate
      </Typography>
    </Box>

    <Box
      onClick={() => setUserRole(false)}
      className={`${
        !userRole ? "bg-white shadow-md" : "bg-transparent"
      } flex-1 flex justify-center text-nowrap items-center p-2 rounded-3xl cursor-pointer transition-all`}
    >
      <Typography
        className={`font-bold text-sm md:text-[15px] text-black`}
      >
        Interviewer
      </Typography>
    </Box>
  </Box>

    {/* ------------------------------------------------------------------------------------ */}

    {errorMsg && (
      <Box className="px-8 sm:px-4">
      <Typography className='text-sm text-red-500 mt-2 font-bold bg-red-100 text-center py-1 rounded-[10px]'>
      {errorMsg}
      </Typography>
      </Box> 
    )}

    {successMsg && (
      <Box className="px-8 sm:px-4">
      <Typography className='text-sm text-green-500 mt-1 font-bold bg-green-100 text-center py-1 rounded-[10px]'>
      {successMsg}
      </Typography>
      </Box> 
    )}

    {/* ------------------------------------------------------------------------------------ */}

              {userRole ? (
                <>
                  <Box className="sm:px-4 mt-4">
                    <TextField
                      type="text"
                      value={candidateData.candidateName}
                      onChange={handleCandidateChange}
                      label="Candidate Name"
                      fullWidth
                      required
                      placeholder="Enter your Name"
                      variant="outlined"
                      name="candidateName"
                      className="mb-5 bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                    />
                  </Box>

                  <Box className="sm:px-4">
                    <TextField
                      type="email"
                      value={candidateData.candidateEmail}
                      onChange={handleCandidateChange}
                      label="Email"
                      fullWidth
                      required
                      placeholder="Enter your Email"
                      variant="outlined"
                      name="candidateEmail"
                      className="mb-5 bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                    />
                  </Box>

                  <Box className="sm:px-4">
                    <TextField
                      value={candidateData.candidatePassword}
                      onChange={handleCandidateChange}
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      label="Password"
                      required
                      placeholder="Enter your password"
                      variant="outlined"
                      name="candidatePassword"
                      className="bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box className="sm:px-4 mt-4">
                    <TextField
                      value={candidateData.candidateConfirmPassword}
                      onChange={handleCandidateChange}
                      type={showPasswords ? "text" : "password"}
                      fullWidth
                      label="Confirm Password"
                      required
                      placeholder="Confirm your Password"
                      variant="outlined"
                      name="candidateConfirmPassword"
                      className="bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibilitys}
                              edge="end"
                            >
                              {showPasswords ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {loading ? (
                    <Box className="flex items-center justify-center mt-6 sm:mt-8">
                    <CircularProgress className="text-black"/>
                    </Box>
                  ):(
                    <Box className="sm:px-4 mt-2">
                    <Button
                      onClick={handleCandidateSubmit}
                      variant="outlined"
                      disabled={
                        !candidateData.candidateName ||
                        !candidateData.candidateEmail ||
                        !candidateData.candidatePassword ||
                        !candidateData.candidateConfirmPassword
                      }
                      fullWidth
                      className="normal-case border-black h-10 text-black hover:text-white font-bold hover:bg-black transition-all rounded-[10px]"
                    >
                      Submit
                    </Button>
                  </Box>
                  )}
                </>
              ) : (
                <>
                  <Box className="sm:px-4 mt-4">
                    <TextField
                      type="text"
                      value={expertData.expertName}
                      onChange={handleExpertChange}
                      label="Interviewer Name"
                      fullWidth
                      required
                      placeholder="Enter your Name"
                      variant="outlined"
                      name="expertName"
                      className="mb-5 bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                    />
                  </Box>

                  <Box className="sm:px-4">
                    <TextField
                      type="email"
                      value={expertData.expertOrgEmail}
                      onChange={handleExpertChange}
                      label="Organization Email"
                      fullWidth
                      required
                      placeholder="Enter your work email"
                      variant="outlined"
                      name="expertOrgEmail"
                      className="mb-5 bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                    />
                  </Box>

                  <Box className="sm:px-4">
                    <TextField
                      value={expertData.expertPassword}
                      onChange={handleExpertChange}
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      label="Password"
                      required
                      placeholder="Enter your password"
                      variant="outlined"
                      name="expertPassword"
                      className="bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box className="sm:px-4 mt-4">
                    <TextField
                      value={expertData.expertConfirmPassword}
                      onChange={handleExpertChange}
                      type={showPasswords ? "text" : "password"}
                      fullWidth
                      label="Confirm Password"
                      required
                      placeholder="Confirm your Password"
                      variant="outlined"
                      name="expertConfirmPassword"
                      className="bg-gray-100 rounded-lg"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibilitys}
                              edge="end"
                            >
                              {showPasswords ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                {loading ? (
                  <Box className="flex items-center justify-center mt-6 sm:mt-8">
                  <CircularProgress className="text-black"/>
                  </Box>
                ): (
                  <Box className="sm:px-4 mt-2">
                  <Button
                    onClick={handleExpertSubmit}
                    variant="outlined"
                    disabled={
                      !expertData.expertName ||
                      !expertData.expertOrgEmail ||
                      !expertData.expertPassword ||
                      !expertData.expertConfirmPassword
                    }
                    fullWidth
                    className="normal-case border-black h-10 text-black hover:text-white font-bold hover:bg-black transition-all rounded-[10px]"
                  >
                    Submit
                  </Button>
                </Box>
                )}

                </>
              )}

              {/* ------------------------------------------------------------------------------------ */}

              <Typography className="text-center sm:mt-4">
                Already have an account?{" "}
                <NavLink to={"/login"}>
                <span className="underline cursor-pointer text-gray-500 hover:text-black">
                  Sign In
                </span>
                </NavLink>
              </Typography>
            </Box>

            {/* ------------------------------------------------------------------------------------ */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;