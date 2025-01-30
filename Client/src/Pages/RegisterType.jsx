import React, { useContext } from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginSlider from "../Components/LoginSlider";

import axios from "axios";
import { DataContext } from "../Context/DataProvider";

const RegisterType = () => {
  const { backendUrl } = useContext(DataContext);

  const [userRole, setUserRole] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [candidateData, setCandidateData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePassword: "",
    candidateConfirmPassword: "",
    candidateCollege: "",
    candidateBranch: "",
  });

  const [expertData, setExpertData] = useState({
    expertName: "",
    expertOrgEmail: "",
    expertPassword: "",
    expertConfirmPassword: "",
    expertDomain: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCandidateChange = (e) => {
    const { name, value } = e.target;
    setCandidateData({ ...candidateData, [name]: value });
  };

  const handleCandidateSubmit = async (e) => {
    e.preventDefault();

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateEmail.test(candidateData.candidateEmail)) {
      // setLoading(false);
      console.log("Please enter a valid email address.");
      return;
    }

    if (candidateData.candidatePassword.length < 8) {
      // setLoading(false);
      console.log("Password must be 8 character long.");
      return;
    }

    if (
      candidateData.candidatePassword !== candidateData.candidateConfirmPassword
    ) {
      console.log("Password Mismatched");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/Candidate/Register`,
        candidateData
      );
      if (response.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(response.data.error.message);
    }
  };

  const handleExpertChange = (e) => {
    const { name, value } = e.target;
    setExpertData({ ...expertData, [name]: value });
  };

  const handleExpertSubmit = (e) => {
    e.preventDefault();

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateEmail.test(expertData.expertOrgEmail)) {
      console.log("Please enter a valid email address.");
      return;
    }

    if (expertData.expertPassword.length < 8) {
      console.log("Password must be 8 character long");
      return;
    }

    if (expertData.expertPassword !== expertData.expertConfirmPassword) {
      console.log("Password Mismatched");
      return;
    }
    console.log(expertData);
  };

  return (
    <>
      {/* <Layout> */}
      <Box className="flex h-screen w-screen items-center justify-center bg-[#8667F2] px-40">
        <Box className="flex gap-4 bg-white py-8 px-4 rounded-[20px] h-[600px] shadow-xl">
          {/* ------------------------------------------------------------------------------------ */}

          <Box className="hidden md:inline-block w-[28vw] shadow-lg rounded-2xl">
            <LoginSlider />
          </Box>

          {/* ------------------------------------------------------------------------------------ */}

          <Box>
            <Box className="h-full px-3 sm:px-6 w-[300px] sm:w-[350px] md:w-[400px] bg-gray-100 pt-8 rounded-[20px] flex-col shadow-lg overflow-y-auto">
              <Typography className="text-center text-[2rem] font-bold font-[roboto] mb-2">
                Sign up
              </Typography>

              {/* ------------------------------------------------------------------------------------ */}

              <Box className="flex items-center justify-between w-fit md:w-fit rounded-[30px] p-2  h-12 md:h-14  bg-[#E0E7FF] mt-4 md:mt-4 mx-auto md:mt-10">
                <Box
                  onClick={() => setUserRole(true)}
                  className={`${
                    userRole ? "bg-[#E5E5E5] shadow-md" : "bg-transparent"
                  } flex-1 flex justify-center items-center text-nowrap p-2 md:p-3 rounded-3xl cursor-pointer transition-all`}
                >
                  <Typography
                    className={`font-bold text-sm md:text-[15px] ${
                      userRole ? "text-black" : "text-black"
                    }`}
                  >
                    Candidate
                  </Typography>
                </Box>

                <Box
                  onClick={() => setUserRole(false)}
                  className={`${
                    !userRole ? "bg-[#E5E5E5] shadow-md" : "bg-transparent"
                  } flex-1 flex justify-center text-nowrap items-center p-2 md:p-3 rounded-3xl cursor-pointer transition-all`}
                >
                  <Typography
                    className={`font-bold text-sm md:text-[15px] ${
                      !userRole ? "text-black" : "text-black"
                    }`}
                  >
                    Interviewer
                  </Typography>
                </Box>
              </Box>

              {/* ------------------------------------------------------------------------------------ */}

              {/* <Box className="px-8 sm:px-4">
   <Typography className='text-sm text-red-500 font-bold bg-red-100 text-center py-1 rounded-[10px]'>
    Error while login
   </Typography>
   </Box>  */}

              {/* ------------------------------------------------------------------------------------ */}

              {userRole ? (
                <>
                  <Box className="sm:px-4 mt-4 sm:mt-6">
                    <TextField
                      type="text"
                      value={candidateData.candidateName}
                      onChange={handleCandidateChange}
                      label="Name"
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

                  <Box className="sm:px-4 ">
                    <TextField
                      type="text"
                      value={candidateData.candidateCollege}
                      onChange={handleCandidateChange}
                      label="College Name"
                      fullWidth
                      placeholder="Enter your College Name"
                      variant="outlined"
                      name="candidateCollege"
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
                      type="text"
                      value={candidateData.candidateBranch}
                      onChange={handleCandidateChange}
                      label="Branch Name"
                      fullWidth
                      placeholder="e.g. IT, AIML"
                      variant="outlined"
                      name="candidateBranch"
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
                      type={showPassword ? "text" : "password"}
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

                  <Box className="sm:px-4 mt-6 sm:mt-8">
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
                </>
              ) : (
                <>
                  <Box className="sm:px-4 mt-4 sm:mt-6">
                    <TextField
                      type="text"
                      value={expertData.expertName}
                      onChange={handleExpertChange}
                      label="Name"
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

                  <Box className="sm:px-4 ">
                    <TextField
                      type="text"
                      value={expertData.expertDomain}
                      onChange={handleExpertChange}
                      label="Domain"
                      fullWidth
                      placeholder="e.g. Web Development,Data Analytics"
                      variant="outlined"
                      name="expertDomain"
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
                      type={showPassword ? "text" : "password"}
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

                  <Box className="sm:px-4 mt-6 sm:mt-8">
                    <Button
                      onClick={handleExpertSubmit}
                      variant="outlined"
                      disabled={
                        !expertData.expertName ||
                        !expertData.expertOrgEmail ||
                        !expertData.expertDomain ||
                        !expertData.expertPassword ||
                        !expertData.expertConfirmPassword
                      }
                      fullWidth
                      className="normal-case border-black h-10 text-black hover:text-white font-bold hover:bg-black transition-all rounded-[10px]"
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              )}

              {/* ------------------------------------------------------------------------------------ */}

              <Typography className="text-center font-medium mt-8 sm:mt-10 cursor-pointer">
                Forgot password?
              </Typography>

              <Typography className="text-center mt-2 sm:mt-4">
                Dont have an account?{" "}
                <span className="underline cursor-pointer text-gray-500 hover:text-black">
                  Sign up
                </span>
              </Typography>
            </Box>

            {/* ------------------------------------------------------------------------------------ */}
          </Box>
        </Box>
      </Box>
      {/* </Layout> */}
    </>
  );
};

export default RegisterType;
