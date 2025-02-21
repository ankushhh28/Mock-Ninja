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
  FormControlLabel
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
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [loading, setLoading] = useState(false);
  const [expertData, setExpertData] = useState({
    //------------ personal details------------
    expertName: "",
    expertOrgEmail: "",
    expertPersonalEmail: "",
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

// ---------------- HANDLING FORM VALIDATION -----------------

  const validateExpertData = () => {
    let newErrors = {};
    let isValid = true;

    // Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const phoneRegex = /^\d{10}$/;
    const experienceRegex = /^[0-9]+$/;
    const accountNumberRegex = /^[0-9]+$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9-_%]+\/?$/;

    const requiredFields = [
      "expertName",
      "expertPersonalEmail",
      "expertOrgEmail",
      "expertPhoneNumber",
      "expertDOB",
      "expertExperience",
      "expertIndAccountNumber",
      "expertIndIfscCode",
      "currentCompany",
      "linkedin",
    ];

    requiredFields.forEach((field) => {
      if (!expertData[field] || expertData[field].trim() === "") {
        newErrors[field] = "This field is required.";
        isValid = false;
      }
    });

    // Name Validation
    if (expertData.expertName && !nameRegex.test(expertData.expertName)) {
      newErrors.expertName = "Enter a valid name.";
      isValid = false;
    }

    // Email Validation
    if (
      expertData.expertPersonalEmail &&
      !emailRegex.test(expertData.expertPersonalEmail)
    ) {
      newErrors.expertPersonalEmail = "Enter a valid personal email.";
      isValid = false;
    }

    // Email Validation
    if (
      expertData.expertOrgEmail &&
      !emailRegex.test(expertData.expertOrgEmail)
    ) {
      newErrors.expertOrgEmail = "Enter a valid organizational email.";
      isValid = false;
    }

    // Phone Validation
    if (
      expertData.expertPhoneNumber &&
      !phoneRegex.test(expertData.expertPhoneNumber)
    ) {
      newErrors.expertPhoneNumber = "Enter a valid 10-digit mobile number.";
      isValid = false;
    }

    // DOB Validation (24 years old)
    if (expertData.expertDOB && !dobRegex.test(expertData.expertDOB)) {
      const birthDate = new Date(expertData.expertDOB);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age < 24) {
        newErrors.expertDOB = "Expert must be at least 24 years old.";
        isValid = false;
      }
    }

    // Experience Validation
    if (
      expertData.expertExperience &&
      !experienceRegex.test(expertData.expertExperience)
    ) {
      newErrors.expertExperience = "Experience should be a number.";
      isValid = false;
    }

    // Account Number Validation
    if (!accountNumberRegex.test(expertData.expertIndAccountNumber)) {
      newErrors.expertIndAccountNumber = "Enter a valid account number.";
      isValid = false;
    }

    // IFSC Code Validation
    if (!ifscRegex.test(expertData.expertIndIfscCode)) {
      newErrors.expertIndIfscCode = "Enter a valid IFSC code.";
      isValid = false;
    }

    //linkedIn Validation
    if (
      expertData.expertLinkedin &&
      !linkedInRegex.test(expertData.expertLinkedin)
    ) {
      newErrors.expertLinkedin = "Enter a valid LinkedIn URL.";
      isValid = false;
    }

    // Update errors state
    setErrors(newErrors);

    return isValid;
  };

// ----------------- HANDLE CHANGE ----------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpertData({ ...expertData, [name]: value });
  };

// ------------------ HANDLE FORM SUBMIT ------------------

  const handleSaveChanges = () => {
    // const isValid = validateExpertData();

    // if (isValid) {
    //   console.log("Saving changes...");
    // } else {
      setModalMsg({
        open: true,
        message: "Please fix the errors before saving.",
        severity: "error",
      });
      setIsEditing(false)
    // }
  };

  return (
    <ExpertLayout>
    {/* ------------------------TOP NAVBAR-------------------------- */}

    <Box className="px-6 pt-7 md:px-16 sticky h-24 z-10 top-0 bg-gray-50 border-b-2 border-gray-200">
      <Box className=" flex justify-between items-center px-4 sm:px-8 pb-6">
        <Typography variant="h5" className="font-semibold text-gray-800">
          Profile
        </Typography>

      {/*---------------EDIT AND SAVE CHANGES BUTTON------------------- */}

      <Box className="flex gap-4">
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="contained"
            startIcon={<EditIcon />}
            className="bg-blue-600 hover:bg-blue-700 text-white w-fit font-light 
            md:font-medium rounded-lg transition-all duration-300 text-wrap"
            sx={{
              fontSize: { xs: "0.50rem", md: "0.75rem" },
              width: { xs: "3rem", md: "6rem" },
              fontWeight: { xs: 300, md: 500 },
            }}
          >
            Edit Profile
          </Button>
        ) : loading ? (
          <CircularProgress size={24} className="text-blue-600" />
        ) : (
          <Button
            type="submit"
            variant="contained"
            startIcon={<TurnedInIcon />}
            className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300"
            onClick={handleSaveChanges}
          >
            Save Changes
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


        <Box className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto mt-8 px-4 sm:px-8">

          {/* ---------------------INFORMATION FROM USER----------------------------- */}
          {/* ---------------------INFORMATION FROM USER----------------------------- */}
          {/* ---------------------INFORMATION FROM USER----------------------------- */}

          <Box className="flex flex-col  w-full md:w-[120%] py-6 rounded-3xl mx-auto">

            {/* ----------------------------- PROFILE IMAGE-------------------------------- */}

            <Box className="flex justify-center mb-8 ">
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
                  // src={candidateData.candidatePicture}
                  className="w-28 md:w-32 h-28 md:h-32"
                  onClick={(e) => e.stopPropagation()} 
                />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                // onChange={(e) => setProfileImage(e.target.files[0])}
                disabled={!isEditing}
              />
             </Badge>
            </Box>

            {/* ------------------------Personal Information------------------------ */}
            {/* ------------------------Personal Information------------------------ */}

            <Box className="mx-6 md:mx-16 space-y-5">
              <Box>
                <Typography
                  variant=""
                  className="text-black font-semibold text-2xl md:text-3xl mb-3 sm:mb-5 mt-2 sm:mt-8"
                >
                  Personal Information
                </Typography>

                {/* --------------------- NAME & GENDER ---------------------------  */}

                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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
                    <TextField
                      label="Gender"
                      type="text"
                      disabled={!isEditing}
                      value={expertData.expertGender}
                      onChange={handleChange}
                      required
                      placeholder="Enter your gender"
                      variant="outlined"
                      name="expertGender"
                      error={!!errors.expertGender}
                      helperText={errors.expertGender || ""}
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

              {/* --------------------- CONTACT and DOB -----------------------------------*/}
              <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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
              <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="Email"
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
                    label="Email"
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
              <Box className="w-full flex gap-5 space-y-3 flex-wrap sm:flex-nowrap">
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
            <Box className="mx-6 md:mx-16 space-y-5">
              <Box>
                <Typography
                  variant=""
                  className="text-black font-semibold text-2xl md:text-3xl mb-3 sm:mb-5 mt-2 sm:mt-8"
                >
                  Professional Information
                </Typography>

                {/* --------------------- COMPANY & EXPERIENCE ---------------------------  */}
                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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

              {/* ---------------------YOUTUBE & INSTAGRAM-----------------------------------*/}
              <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="youtube"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertYoutube}
                    onChange={handleChange}
                    required
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
                    required
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

              {/* --------------------- LINKEDIN ----------------------------------- */}
              <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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
                    error={!!errors.expertLinkedin}
                    helperText={errors.expertLinkedin || ""}
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
              <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="bio"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertBio}
                    onChange={handleChange}
                    required
                    // placeholder="your bio"
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
              <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
                <Box className="w-full">
                  <TextField
                    label="About"
                    type="text"
                    disabled={!isEditing}
                    value={expertData.expertAbout}
                    onChange={handleChange}
                    required
                    placeholder="your about section"
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
            <Box className="mx-6 md:mx-16 space-y-5">
            <Typography className="text-black font-semibold text-2xl md:text-3xl mb-3 sm:mb-2 mt-2 sm:mt-8">
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
                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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
                {/* --------------------Ifsc code and branch name------------------------ */}
                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
                  <Box className="w-full">
                    <TextField
                      label="Ifsc Code"
                      type="number"
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
                      name="expertBranchName"
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

                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
                  <Box className="w-full">
                    <TextField
                      label="UPI"
                      type="text"
                      disabled={!isEditing}
                      value={expertData.expertIndUPI}
                      onChange={handleChange}
                      required
                      placeholder="enter upi pin"
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
                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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
                      error={!!errors.expertOUTaccountNumber}
                      helperText={errors.expertOUTaccountNumber || ""}
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

                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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

                <Box className="w-full flex gap-5 flex-wrap sm:flex-nowrap">
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

            {/* <Box className="flex flex-col gap-y-4 w-full">
    {[
      { label: "Name", name: "expertName" },
      { label: "Email", name: "expertOrgEmail" },
      { label: "Personal Email", name: "expertPersonalEmail" },
      { label: "Contact no.", name: "expertPhoneNumber" },
      { label: "City", name: "expertCity" },
      { label: "Address", name: "expertAddress" },
      //-------------------------------------------
      { label: "Experience", name: "expertExperience" },
      { label: "Profile Photo URL", name: "expertProfilePhoto" },
      { label: "LinkedIn", name: "expertLinkedin" },
      { label: "YouTube", name: "expertYoutube" },
      { label: "Instagram", name: "expertInstagram" },
      { label: "Current Company", name: "expertCurrentCompany" },
      { label: "Bio", name: "expertBio" },
      { label: "About", name: "expertAbout" },
      //-------------------------------------------
      {
        label: "Individual Account Number",
        name: "expertIndAccountNumber",
      },
      {
        label: "Individual Account Holder Name",
        name: "expertIndAccountHolderName",
      },
      { label: "Individual IFSC Code", name: "expertIndIfscCode" },
      { label: "Individual Branch Name", name: "expertIndBranchName" },
      { label: "Individual UPI ID", name: "expertIndUPI" },
      {
        label: "Outward Account Number",
        name: "expertOUTaccountNumber",
      },
      {
        label: "Outward Account Holder Name",
        name: "expertOUTaccountHolderName",
      },
      { label: "Outward IAN Number", name: "expertOUTianNumber" },
      { label: "Outward SWIFT Code", name: "expertOUTswiftCode" },
    ].map(({ label, name }) => (
      <TextField
        key={name}
        label={label}
        fullWidth
        value={expertData[name]}
        onChange={handleChange}
        variant="outlined"
        name={name}
        className="my-5 bg-gray-50 rounded-lg"
        error={!!errors[name]} // Show error if exists
        helperText={errors[name] || ""}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "blue-300",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
        }}
        disabled={isEditing}
      />
    ))}
  </Box> */}

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
