import axios from "axios"
import React, { useState, useEffect, useRef, useContext } from "react";
import ExpertLayout from "../ExpertLayout/ExpertLayout";
import {
  Box,
  TextField,
  Button,
  Typography,
  Badge,
  Avatar,
  Snackbar,
  Dialog,
  DialogActions,
  DialogTitle,
  CircularProgress,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { DataContext } from "../../Context/DataProvider";

const Exp_Profile = () => {
  const { account, setAccount, backendUrl } = useContext(DataContext);

  const fileInputRef = useRef(null);

  // -------------------- USE STATES ------------------

  const [errors, setErrors] = useState({});
  const [bankType, setBankType] = useState("domestic");
  const [profileImage, setProfileImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [expertData, setExpertData] = useState({
    role:account.role,
    //------------ personal details------------
    expertName: "",
    expertOrgEmail: "",
    expertPersonalEmail: account.email,
    expertPhoneNumber: "",
    expertGender: "",
    expertAddress: "",
    expertDOB: "",
    //--------professional details------------
    expertExperience: "",
    expertProfilePhoto: "",
    expertLinkedin: "",
    expertYoutube: "",
    expertInstagram: "",
    expertCurrentCompany: "",
    expertBio: "",
    expertAbout: "",
    //------------banking details------------
    expertIndAccountNumber: "",
    expertIndAccountHolderName: "",
    expertIndIfscCode: "",
    expertIndBranchName: "",
    expertIndUPI: "",
    expertOUTaccountNumber: "",
    expertOUTaccountHolderName: "",
    expertOUTianNumber: "",
    expertOUTswiftCode: "",
  });

  // ---------------  HANDLE AVATAR CLICK -----------------

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // ----------------- HANDLE CHANGE ----------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpertData({ ...expertData, [name]: value });
  };

  // ------------------ HANDLING BANK VALIDATIONS ----------------

  const validateForm = () => {
    if (bankType === "domestic") {
      return (
        expertData.expertIndIfscCode?.trim() &&
        expertData.expertIndBranchName?.trim() &&
        expertData.expertIndAccountHolderName?.trim() &&
        expertData.expertIndAccountNumber?.trim() 
      );
    } else if (bankType === "international") {
      return (
        expertData.expertOUTaccountHolderName?.trim() &&
        expertData.expertOUTaccountNumber?.trim() &&
        expertData.expertOUTianNumber?.trim() &&
        expertData.expertOUTswiftCode?.trim()
      );
    }
    return false; 
  };

  // ------------------ HANDLE FORM SUBMIT ------------------

  const handleSaveChanges = async() => {
    setUpdateLoading(true);
  
    // Name Validation
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(expertData.expertName.trim())) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Enter a valid full name.", severity: "error" });
      return;
    }
  
    // Email Validation
    if (!expertData.expertPersonalEmail || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(expertData.expertPersonalEmail.trim())) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Enter a valid personal email.", severity: "error" });
      return;
    }
  
    if (!expertData.expertOrgEmail || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(expertData.expertOrgEmail.trim())) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Enter a valid organizational email.", severity: "error" });
      return;
    }
  
    // Phone Number Validation
    if (!/^(?:\+91)?\d{10}$/.test(expertData.expertPhoneNumber.trim())) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Enter a valid 10-digit phone number.", severity: "error" });
      return;
    }
  
    // DOB Validation (24+ years old)
    const today = new Date();
    const birthDate = new Date(expertData.expertDOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 24) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Expert must be at least 24 years old.", severity: "error" });
      return;
    }
  
    // Experience Validation
    if (!/^\d+$/.test(expertData.expertExperience) || parseInt(expertData.expertExperience) < 0) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Experience should be a positive number.", severity: "error" });
      return;
    }

    if(expertData.bankType === 'Domestic'){
    if (!/^\d{9,18}$/.test(expertData.expertIndAccountNumber.trim())) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Enter a valid account number (9-18 digits).", severity: "error" });
      return;
    }
  
    // IFSC Code Validation
    if (!/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(expertData.expertIndIfscCode.trim())) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Enter a valid IFSC code.", severity: "error" });
      return;
    }}
  
    // ---INTERNATIONAL---
    // Swift code validation
    if(expertData.bankType === 'International'){
    if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(expertData.expertOUTswiftCode.trim())) {
      setUpdateLoading(false);
      setModalMsg({ open: true, message: "Enter a valid SWIFT code.", severity: "error" });
      return;
    }}

    //ALL FIELDS REQUIRED
    if (!validateForm()) {
      setModalMsg({ open: true, severity: "error", message: "Please Fill All Required Fields Below." });
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/Exp//Updating-Profile`, expertData , {
        headers:{
          Authorization: `Bearer ${account.accessToken}`
        }
      })
      if(response.status === 200){
        setModalMsg({ open: true, message: response?.data?.message || "Profile Updated Successfully", severity: "success" });
        setIsEditing(false)
      }
    } catch (error) {
      setModalMsg({ open: true, message: error.response?.data?.message || "Check Your Conntection! Try Again Later", severity: "error" });
    } finally {
      setUpdateLoading(false)
    }
  };
  
  // ------------- FETCHING PROFILE DATA ---------------------

  useEffect(() => {
    const fetching = async() => {
      setLoading(true)
      try {
        const response = await axios.get(`${backendUrl}/Exp/Fetching-Profile`, {
          params:{email:account.email, role:account.role},
          headers:{
            Authorization:`Bearer ${account.accessToken}`
          }
        })
        if(response.status === 200){
          setExpertData({...response.data, expertDOB: response.data.expertDOB ? response.data.expertDOB.split("T")[0] : ""})
        }
      } catch (error) {
        setModalMsg({ open: true, message: error.response?.data?.message || "Check Your Conntection! Try Again Later", severity: "error" });
      } finally {
        setLoading(false)
      }
    }
    fetching()
  },[updateLoading])

  // -------------- IMAGE UPLOADING TO PROFILE ---------------

  const UploadImage = async(img) => {
    const serverResponse = {
      email:account.email,
      role:account.role,
      img:img,
    }

    try {
      const response = await axios.post(`${backendUrl}/Exp/Image-Saved-to-expert`, serverResponse, {
        headers: {
          Authorization: `Bearer ${account.accessToken}`
        }
      })
      if(response.status === 200){
        setModalMsg({ open: true, message: response?.data?.message || "Check your connection! Try later", severity: 'success' })
      }
    } catch (error) {
      setModalMsg({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
    } finally {
      setProfileImage("")
    }
  }

  // ------------- IMAGE UPLOADING TO DATABSE -------------------

  const handleImageUpload = async() => {
    if(profileImage === ""){return}
    const formdata = new FormData();
    formdata.append("file", profileImage)
    formdata.append("role", account.role);
    setImageLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/Can/Image-Upload-Database`, formdata,  {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      if(response.status === 200){
        const imageUrl = `${backendUrl}/Can/file/${response.data}`
        await UploadImage(imageUrl); 
        setIsEditing(false)
      }
    } catch (error) {
      setModalMsg({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
    } finally {
      setImageLoading(false)
    }
  }

  useEffect(() => {
    if (profileImage !== "") {
      handleImageUpload();
    }
  }, [profileImage, imageLoading]);

  return (
    <ExpertLayout>
      {/* ------------------------TOP NAVBAR-------------------------- */}

      <Box className="px-1 pt-7 md:px-16 sticky h-24 z-10 top-0 bg-gray-50 border-b-2 border-gray-200">
        <Box className=" flex justify-between items-center px-4 sm:px-8 pb-6">
        {loading ? (
          <CircularProgress size={30} className="text-black"/>
        ) : (
          <Typography variant="h3" className="font-semibold text-xl sm:text-4xl text-gray-800" align="center">
          Profile
        </Typography>
        )}
          
          {/*---------------EDIT AND SAVE CHANGES BUTTON------------------- */}

          <Box className="w-full flex gap-2 sm:gap-4 justify-end" 
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end", md: "flex-end" },
          }}>
            {(!isEditing && !updateLoading) ? (
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="contained"
                startIcon={<EditIcon />}
                className="bg-blue-600 hover:bg-blue-700 text-white w-fit font-light 
            md:font-medium rounded-lg text-wrap"
              >
                Edit <span className="hidden sm:block">Profile</span>
              </Button>
            ) : updateLoading ? (
              <CircularProgress size={30} className="text-green-600 mr-10" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                startIcon={<TurnedInIcon />}
                className="bg-green-600 hover:bg-green-700 text-white w-fit font-light 
            md:font-medium rounded-lg text-wrap"
                onClick={handleSaveChanges}
              >
                Save <span className="hidden sm:block">Changes</span>
              </Button>
            )}

            {/* ----------------LOGOUT BUTTON---------------------- */}
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<LogoutIcon />}
              className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300"
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ------------------------------ FORM SECTION ----------------------------- */}
      {/* ------------------------------ FORM SECTION ----------------------------- */}
      {/* ------------------------------ FORM SECTION ----------------------------- */}

      <Box className="min-h-screen w-full bg-gray-50 py-2">
        <Box className="flex flex-col md:flex-row w-full max-w-7xl mx-auto mt-3 px-4 sm:px-8">
          
          {/* ---------------------INFORMATION FROM USER----------------------------- */}
          {/* ---------------------INFORMATION FROM USER----------------------------- */}
          {/* ---------------------INFORMATION FROM USER----------------------------- */}

          <Box className="flex flex-col space-y-5 w-full md:w-[120%] rounded-3xl mx-auto">

            {/* ----------------------------- PROFILE IMAGE-------------------------------- */}
            
            <Box className="flex justify-center mb-2 mt-1 ">
            {imageLoading ? (
              <CircularProgress size={30} className="text-black"/>
            ) : (
              <Badge
                color="info"
                overlap="circular"
                className="cursor-pointer"
                badgeContent={<EditIcon fontSize="small" />}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                onClick={handleAvatarClick}
              >
                <Avatar
                  src={expertData.expertProfilePhoto}
                  className="w-28 md:w-32 h-28 md:h-32"
                  onClick={(e) => e.stopPropagation()}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  disabled={!isEditing}
                />
              </Badge>
            )}
            </Box>

            {/* ------------------------Personal Information------------------------ */}
            {/* ------------------------Personal Information------------------------ */}

            <Box className="mx-3 md:mx-16 p-2 md:p-4 border border-black rounded-3xl m-0 md:m-3">
              <Box>
                <Typography className="text-black font-semibold text-2xl md:text-3xl mb-3 sm:mb-5 mt-3 sm:mt-5">
                  Personal Information
                </Typography>

                {/* --------------------- NAME & GENDER ---------------------------  */}

                <Box className="w-full sm:gap-x-3 flex flex-wrap sm:flex-nowrap">
                  <Box className="w-full">
                    <TextField
                      label="Name"
                      type="text"
                      disabled={!isEditing}
                      value={expertData.expertName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      variant="outlined"
                      name="expertName"
                      error={!!errors.expertName}
                      helperText={errors.expertName || ""}
                      className="mb-5 bg-gray-100 rounded-lg w-full"
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

                  <Box className="w-full">
                  <FormControl fullWidth variant="outlined" className="mb-5 bg-gray-100 rounded-lg" disabled={!isEditing}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={expertData.expertGender || "male"}
                      onChange={handleChange}
                      name="expertGender"
                      label="Gender"
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
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>
                </Box>
              </Box>

              {/* --------------------- CONTACT and DOB -----------------------------------*/}
              <Box className="w-full sm:gap-x-3 flex flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="Contact"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertPhoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    variant="outlined"
                    name="expertPhoneNumber"
                    error={!!errors.expertPhoneNumber}
                    helperText={errors.expertPhoneNumber || ""}
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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

                <Box className="w-full">
                  <TextField
                    type="Date"
                    disabled={!isEditing}
                    value={expertData.expertDOB}
                    onChange={handleChange}
                    variant="outlined"
                    name="expertDOB"
                    error={!!errors.expertDOB}
                    helperText={errors.expertDOB || ""}
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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
              </Box>

              {/* --------------------- PERSONAL MAIL & ORG MAIL -----------------------------------*/}
              <Box className="w-full flex sm:gap-x-3 flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="Personal Email"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertPersonalEmail}
                    onChange={handleChange}
                    required
                    placeholder="Enter your personal email"
                    variant="outlined"
                    name="expertPersonalEmail"
                    error={!!errors.expertPersonalEmail}
                    helperText={errors.expertPersonalEmail || ""}
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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

                <Box className="w-full">
                  <TextField
                    label="Org Email"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertOrgEmail}
                    onChange={handleChange}
                    required
                    placeholder="Enter your personal email"
                    variant="outlined"
                    name="expertOrgEmail"
                    error={!!errors.expertOrgEmail}
                    helperText={errors.expertOrgEmail || ""}
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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
              </Box>

              {/* --------------------- ADDRESSS -----------------------------------*/}
              <Box className="w-full flex space-y-3 flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="Address"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertAddress}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Addess"
                    variant="outlined"
                    name="expertAddress"
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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
              </Box>
            </Box>

            {/* -----------------------PROFESSIONAL DETAILS------------------------- */}
            {/* -----------------------PROFESSIONAL DETAILS------------------------- */}

            <Box className="mx-3 md:mx-16 p-2 md:p-4 border border-black rounded-3xl m-0 md:m-3">
              <Box>
                <Typography className="text-black font-semibold text-2xl md:text-3xl mb-3 sm:mb-5 mt-3 sm:mt-5">
                  Professional Information
                </Typography>

                {/* --------------------- COMPANY & EXPERIENCE ---------------------------  */}
                <Box className="w-full flex sm:gap-x-3 flex-wrap sm:flex-nowrap">
                  <Box className="w-full">
                    <TextField
                      label="CurrentCompany"
                      type="text"
                      disabled={!isEditing}
                      value={expertData.expertCurrentCompany}
                      onChange={handleChange}
                      required
                      placeholder="Enter your company name"
                      variant="outlined"
                      name="expertCurrentCompany"
                      className="mb-5 bg-gray-100 rounded-lg w-full"
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

                  <Box className="w-full">
                    <TextField
                      label="Experience"
                      type="number"
                      disabled={!isEditing}
                      value={expertData.expertExperience}
                      onChange={handleChange}
                      required
                      placeholder="Enter your years of Experience"
                      variant="outlined"
                      name="expertExperience"
                      error={!!errors.expertExperience}
                      helperText={errors.expertExperience || ""}
                      className="mb-5 bg-gray-100 rounded-lg w-full"
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
                </Box>
              </Box>

          {/* --------------------- LINKEDIN ----------------------------------- */}
                <Box className="w-full flex flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="LinkedIn"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertLinkedin}
                    onChange={handleChange}
                    required
                    placeholder="copy your linkedIn profile url"
                    variant="outlined"
                    name="expertLinkedin"
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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
              </Box>

              {/* ---------------------YOUTUBE & INSTAGRAM-----------------------------------*/}
              <Box className="w-full flex sm:gap-x-3 flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="Youtube"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertYoutube}
                    onChange={handleChange}
                    placeholder="Enter your youtube channel name"
                    variant="outlined"
                    name="expertYoutube"
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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

                <Box className="w-full">
                  <TextField
                    label="Instagram"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertInstagram}
                    onChange={handleChange}
                    placeholder="Enter your youtube channel name"
                    variant="outlined"
                    name="expertInstagram"
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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
              </Box>

              {/* --------------------- BIO -----------------------------------*/}
              <Box className="w-full flex flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="Bio"
                    type="text"
                    multiline
                    rows={2}
                    disabled={!isEditing}
                    value={expertData.expertBio}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Profile Bio here"
                    variant="outlined"
                    name="expertBio"
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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
              </Box>

              {/* --------------------------ABOUT-----------------------------*/}
              <Box className="w-full flex flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="About"
                    type="text"
                    multiline
                    rows={4}
                    disabled={!isEditing}
                    value={expertData.expertAbout}
                    onChange={handleChange}
                    required
                    placeholder="Your About Section"
                    variant="outlined"
                    name="expertAbout"
                    className="mb-5 bg-gray-100 rounded-lg w-full"
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
              </Box>
            </Box>

            {/* ---------------------------BANK DETAILS-------------------------- */}
            {/* ---------------------------BANK DETAILS-------------------------- */}

            <Box className="mx-3 md:mx-16 p-2 md:p-4 border border-black rounded-3xl m-0 md:m-3">
              <Typography className="text-black font-semibold text-2xl md:text-3xl mb-3 sm:mb-2 mt-3 sm:mt-5">
                Bank Details
              </Typography>

              {/* Radio Buttons for Bank Type */}
              <RadioGroup
                row
                value={bankType}
                onChange={(e) => setBankType(e.target.value)}
              >
                <FormControlLabel
                  value="domestic"
                  control={<Radio />}
                  label="Domestic"
                />
                <FormControlLabel
                  value="international"
                  control={<Radio />}
                  label="International"
                />
              </RadioGroup>

              {bankType === "domestic" ? (
                <>
                  <Box className="w-full flex sm:gap-x-3 flex-wrap sm:flex-nowrap">
                    <Box className="w-full">
                      <TextField
                        label="Account Holder Name"
                        type="text"
                        disabled={!isEditing}
                        value={expertData.expertIndAccountHolderName}
                        onChange={handleChange}
                        required
                        placeholder="Enter account holder name"
                        variant="outlined"
                        name="expertIndAccountHolderName"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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

                    <Box className="w-full">
                      <TextField
                        label="Account Number"
                        type="number"
                        disabled={!isEditing}
                        value={expertData.expertIndAccountNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Account number"
                        variant="outlined"
                        name="expertIndAccountNumber"
                        error={!!errors.expertIndAccountNumber}
                        helperText={errors.expertIndAccountNumber || ""}
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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
                  </Box>
                  {/* --------------------IFSC code and branch name------------------------ */}
                  <Box className="w-full flex sm:gap-x-3 flex-wrap sm:flex-nowrap">
                    <Box className="w-full">
                      <TextField
                        label="IFSC Code"
                        type="text"
                        disabled={!isEditing}
                        value={expertData.expertIndIfscCode}
                        onChange={handleChange}
                        required
                        placeholder="Enter IFSC Code"
                        variant="outlined"
                        name="expertIndIfscCode"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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

                    <Box className="w-full">
                      <TextField
                        label="Branch Name"
                        type="text"
                        disabled={!isEditing}
                        value={expertData.expertIndBranchName}
                        onChange={handleChange}
                        required
                        placeholder="Enter Branch Name"
                        variant="outlined"
                        name="expertIndBranchName"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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
                  </Box>

                  {/* --------------------- UPI PIN-----------------------*/}

                  <Box className="w-full flex sm:gap-x-3 flex-wrap sm:flex-nowrap">
                    <Box className="w-full">
                      <TextField
                        label="UPI Id"
                        type="text"
                        disabled={!isEditing}
                        value={expertData.expertIndUPI}
                        onChange={handleChange}
                        required
                        placeholder="enter UPI Id"
                        variant="outlined"
                        name="expertIndUPI"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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
                  </Box>
                </>
              ) : (
                <>
                  {/* --------------------- ACCOUNT NO & HOLDER NAME ---------------------------  */}
                  <Box className="w-full flex sm:gap-x-3 flex-wrap sm:flex-nowrap">
                    <Box className="w-full">
                      <TextField
                        label="Account Holder Name"
                        type="text"
                        disabled={!isEditing}
                        value={expertData.expertOUTaccountHolderName}
                        onChange={handleChange}
                        required
                        placeholder="Enter account holder name"
                        variant="outlined"
                        name="expertOUTaccountHolderName"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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

                    <Box className="w-full">
                      <TextField
                        label="Account Number"
                        type="number"
                        disabled={!isEditing}
                        value={expertData.expertOUTaccountNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Account number"
                        variant="outlined"
                        name="expertOUTaccountNumber"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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
                  </Box>

                  {/* --------------------- IAN NUMBER-----------------------*/}

                  <Box className="w-full flex flex-wrap sm:flex-nowrap">
                    <Box className="w-full">
                      <TextField
                        label="IAN number"
                        type="number"
                        disabled={!isEditing}
                        value={expertData.expertOUTianNumber}
                        onChange={handleChange}
                        required
                        placeholder="enter IAN number"
                        variant="outlined"
                        name="expertOUTianNumber"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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
                  </Box>
                  {/* --------------------- swift code-----------------------*/}

                  <Box className="w-full flex flex-wrap sm:flex-nowrap">
                    <Box className="w-full">
                      <TextField
                        label="Swift code"
                        type="text"
                        disabled={!isEditing}
                        value={expertData.expertOUTswiftCode}
                        onChange={handleChange}
                        required
                        placeholder="enter swift code"
                        variant="outlined"
                        name="expertOUTswiftCode"
                        className="mb-5 bg-gray-100 rounded-lg w-full"
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
                  </Box>
                </>
              )}
            </Box>

{/* ----------------- LOGOUT CONFIRM MODAL --------------------------- */}

            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle className="mt-2">
                Are you sure you want to logout your account ?
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                  onClick={() =>
                    setAccount({
                      accessToken: "",
                      name: "",
                      email: "",
                      refreshToken: "",
                      role: "",
                    })
                  }
                  className="text-red-500"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

{/* ----------------- SNACK BAR -------------------------------------- */}

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
                <b>{modalMsg.message}</b>
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </ExpertLayout>
  );
};

export default Exp_Profile;