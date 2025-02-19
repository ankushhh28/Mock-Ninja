import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoginSlider from "../Components/LoginSlider";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { DataContext } from "../Context/DataProvider";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const { backendUrl, setAccount } = useContext(DataContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [credentials, setCridentials] = useState({
    name: "",
    email: "",
  });

  // ------------------------------------------------------------

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  // ------------------------------------------------------------

  useEffect(() => {
    if (credentials.email !== "") {
      const handleGoogleLogin = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            `${backendUrl}/Google-Login`,
            credentials
          );
          setAccount(response.data);
          if (response.data.role === "Candidate") {
            navigate("/Candidate/Home");
          } else if (response.data.role === "Interviewer") {
            navigate("/Interviewer/Home");
          }
        } catch (error) {
          setErrorMsg(
            error?.response?.data?.message || "Check your connetions! Try Later"
          );
        } finally {
          setLoading(false);
        }
      };
      handleGoogleLogin();
    }
  }, [credentials]);

  // ------------------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // ------------------------------------------------------------

  useEffect(() => {
    setErrorMsg("");
  }, [formdata]);

  // ------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!formdata.email) {
      setLoading(false);
      setErrorMsg("Email is required");
      return;
    }

    if (!formdata.password) {
      setLoading(false);
      setErrorMsg("Password is required");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/Login`, formdata);
      if (response.status === 200) {
        setAccount(response.data);
        if (response.data.role === "Candidate") {
          navigate("/Candidate/Home");
        } else if (response.data.role === "Interviewer") {
          navigate("/Interviewer/Home");
        }
      }
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Check your connetions! Try Later"
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Box
        // sx={{backgroundImage: `url(${backImg1})`}}
        className="flex h-screen w-screen items-center justify-center px-40 bg-gradient-to-br from-purple-200 to-purple-700"
      >
        {/* --------------------------------- BACK --------------------------------------------- */}

        <Box className="absolute top-2 left-0">
          <NavLink to={"/"}>
            <Button variant="filled" className="font-semibold  text-black ">
              <ArrowBackIcon className="text-gray-800 text-2xl" />
            </Button>
          </NavLink>
        </Box>
        <Box className="flex gap-4 bg-white py-8 px-4 rounded-[20px] h-[580px] sm:h-[680px] shadow-xl">
          {/* ------------------------------------------------------------------------------------ */}

          <Box className="hidden md:inline-block w-[28vw] shadow-lg rounded-2xl">
            <LoginSlider />
          </Box>

          {/* ------------------------------------------------------------------------------------ */}

          <Box>
            <Box className="h-full px-3 sm:px-6 w-[300px] sm:w-[350px] md:w-[400px] bg-gray-100 pt-8 rounded-[20px] flex-col shadow-lg">
              {/* ------------------------------------------------------------------------------------------- */}
              <Typography className="text-center text-[2rem] font-bold font-[roboto] mb-2">
                Login
              </Typography>

              {/* ------------------------------------------------------------------------------------ */}

              <Box className="flex justify-center mb-2 mt-4">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    if (decoded) {
                      setCridentials(decoded);
                      // console.log(decoded)
                    }
                  }}
                  onError={() => {
                    console.log("Google Login Failed");
                  }}
                  useOneTap
                />
              </Box>

              {/* ------------------------------------------------------------------------------------ */}

              {errorMsg && (
                <Box className="px-8 sm:px-4 mt-3 sm:mt-6">
                  <Typography className="text-sm text-red-500 font-bold bg-red-100 text-center py-1 rounded-[10px]">
                    {errorMsg}
                  </Typography>
                </Box>
              )}

              {/* ------------------------------------------------------------------------------------ */}

              <Box className="sm:px-4 mt-4 sm:mt-8">
                <TextField
                  type="email"
                  value={formdata.email}
                  onChange={handleChange}
                  label="Email"
                  fullWidth
                  required
                  placeholder="Enter your email"
                  variant="outlined"
                  name="email"
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

              {/* ------------------------------------------------------------------------------------ */}

              <Box className="sm:px-4">
                <TextField
                  value={formdata.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  label="Password"
                  required
                  placeholder="Enter your password"
                  variant="outlined"
                  name="password"
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* ------------------------------------------------------------------------------------ */}

              {loading ? (
                <Box className="flex items-center justify-center mt-6 sm:mt-8">
                  <CircularProgress className="text-black" />
                </Box>
              ) : (
                <Box className="sm:px-4 mt-6 sm:mt-8">
                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    fullWidth
                    className="normal-case border-black h-10 text-black hover:text-white font-bold hover:bg-black transition-all rounded-[10px]"
                  >
                    Login
                  </Button>
                </Box>
              )}

              <NavLink to={"/Forgot-password"}>
                <Typography className="text-center font-medium mt-8 sm:mt-10 cursor-pointer">
                  Forgot password?
                </Typography>
              </NavLink>

              <Typography className="text-center mt-2 sm:mt-4">
                Dont have an account?
                <Link to={"/Register"}>
                  <span className="underline cursor-pointer text-gray-500 hover:text-black">
                    Sign up
                  </span>
                </Link>
              </Typography>
            </Box>

            {/* ------------------------------------------------------------------------------------ */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
