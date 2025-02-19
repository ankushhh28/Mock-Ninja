import axios from "axios";
import React, { useContext, useState, useRef, useEffect } from "react";
import Can_Layout from "./CanLayout/Can_Layout";
import {
  Box,
  TextField,
  Button,
  Badge,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { DataContext } from "../Context/DataProvider";
import { useNavigate } from "react-router-dom";

const CanProfile = () => {

  const { account, setAccount, backendUrl } = useContext(DataContext);
  
  const fileInputRef = useRef(null); 

// ---------------------------------------------------------------------

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
// ---------------------------- Use States ----------------------------- 

  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [imageLoading, setImageLoading] = useState(false)
  const [modalMsg, setModalMsg] = useState({open:false, message:"", severity:""})
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)

  const [candidateData, setCandidateData] = useState({
    candidateName:"",
    candidateEmail:"",
    candidatePicture:"",
    candidateNumber:"",
    candidateCollege:"",
    candidateCourse:"",
    candidateBranch:"",
    candidateCity:"",
    role: account.role
  })

// ---------------------------------------------------------------------------------

  const UploadImage = async(img) => {
    const serverResponse = {
      email:account.email,
      role:account.role,
      img:img,
    }

    try {
      const response = await axios.post(`${backendUrl}/Can/Image-Saved-to-candidate`, serverResponse, {
        headers: {
          Authorization: `Bearer ${account.accessToken}`
        }
      })
      if(response.status === 200){
        setModalMsg({ open: true, message: response?.data?.message || "Check your connection! Try later", severity: 'success' })
      }
    } catch (error) {
      console.log(error.response.data.message)
    } finally {
      setProfileImage("")
    }
  }

// ---------------------------------------------------------------------------------

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
  }, [profileImage]);

// ---------------------------------------------------------------------------------

  const handleChange = (e) => {
    const {name, value} = e.target
    setCandidateData({...candidateData, [name]:value})
  }

// ---------------------------------------------------------------------------------

  const handleSaveChange = async() => {

    const { candidateNumber, candidateEmail, candidateName, city } = candidateData;

    if (!/^\d{10}$/.test(candidateNumber)) {
      setLoading(false);
      setModalMsg({ open: true, message: "Enter a valid 10-digit Mobile Number!", severity: 'error' });
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateEmail)) {
      setLoading(false);
      setModalMsg({ open: true, message: "Enter a valid Email Address!", severity: 'error' });
      return false;
    }
  
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!nameRegex.test(candidateName)) {
      setLoading(false);
      setModalMsg({ open: true, message: "Enter a valid Name (at least 2 characters)!", severity: 'error' });
      return false;
    }
  
    const cityRegex = /^[a-zA-Z\s]{2,}$/;
    if (!cityRegex.test(city)) {
      setLoading(false);
      setModalMsg({ open: true, message: "Enter a valid City Name!", severity: 'error' });
      return false;
    }

    setLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/Can/Candidate-Profile-Update`, candidateData, {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        }
      })
      if(response.status === 200){
        setModalMsg({ open: true, message: response?.data?.message || "Check your connection! Try later", severity: 'success' })
      }
    } catch (error) {
      setModalMsg({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
    } finally {
      setLoading(false)
    }
  }
  
// ---------------------------------------------------------------------------------

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      const serverResponse = {
        role: account.role,
        email: account.email,
        accessToken: account.accessToken,
      };
      setFetchLoading(true)
      try {
        const response = await axios.get(
          `${backendUrl}/Can/Fetching-Candidate-Details`,
          {
            params: { email: serverResponse.email, role: serverResponse.role },
            headers: {
              Authorization: `Bearer ${serverResponse.accessToken}`,
            },
          }
        );
        // console.log(response.data)
        setCandidateData(response.data)
      } catch (error) {
        setModalMsg({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
      } finally {
        setFetchLoading(false)
      }
    };

    fetchCandidateDetails();
  }, []);

// -------------------------------------------------------------------------------

  return (
    <>

    <Can_Layout>
    <Box className="h-auto w-screen py-6">

{/* -------------------------------------------------------------------------------- */}

    <Box className="flex justify-between mx-4 sm:mx-16 pb-4 border-b-2 border-b-gray-300">
      <Typography className="font-bold text-[17px] sm:text-[20px] mt-1 text-black">
        Profile
      </Typography>

      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        className="normal-case font-bold text-[13px] sm:text-[18px] text-white rounded-[30px] bg-gradient-to-r from-red-400 to-red-700 border-red-600"
      >
        <span>
          <LogoutIcon className="text-[20px] mr-2 font-extrabold" />
        </span>
        Logout
      </Button>
    </Box>

{/* -------------------------------- Main Container------------------------------ */}

    <Box className="flex flex-col gap-8 w-[90%] md-w-[75%] h-auto bg-gray-100  py-6   mx-auto  my-9 ">

{/* --------------------------------- Buttons --------------------------- */}

    <Box className="flex gap-6 justify-end px-2">
      {isEditing && !loading ? (
        <Button
        onClick={() => setIsEditing(!isEditing)}
        variant="outlined"
        className="flex items-center justify-center normal-case font-bold text-[12px] sm:text-[18px] text-white rounded-[30px] bg-gradient-to-r from-blue-400 to-blue-700 border-blue-600"
      >
        <span>
          <EditIcon className="text-[20px] mr-2 font-extrabold" />
        </span>
        Edit Profile
      </Button>
      ) : loading ? (
        <Box className="mr-4 sm:mr-8 lg:mr-10 ">
        <CircularProgress className="text-primary" />

        </Box>
      ):(
        <Button
        type="submit"
        variant="outlined"
        className="flex items-center justify-center normal-case font-bold text-[12px] sm:text-[18px] text-white rounded-[30px] bg-gradient-to-r from-blue-400 to-blue-700 border-blue-600"
        onClick={() => {setIsEditing(!isEditing);handleSaveChange()}}
      >
        <span>
          <TurnedInIcon className="text-[20px] mr-2 font-extrabold" />
        </span>
        Save Changes
      </Button>
      )}
    </Box>

{/* ----------------   ---------- Form Section     ---------------------------- */}

    <Box className=" flex flex-col  w-full md:w-[75%] px-12 py-6 rounded-3xl mx-auto">

{/* -------------------------------------------------------------------------- */}

    <Box className="flex justify-center mb-8 ">
    {imageLoading || fetchLoading ? (
      <Box>
        <CircularProgress/>
      </Box>
    ) : (
      <>
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
        src={candidateData.candidatePicture}
        className="w-28 md:w-32 h-28 md:h-32"
        onClick={(e) => e.stopPropagation()} 
      />
    </Badge>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => setProfileImage(e.target.files[0])}
        disabled={isEditing}
      />
      </>
    )}
    </Box>

{/* -------------------------------------------------------------------------- */}

          <Box className="w-full ">
            <TextField
              label="Name"
              fullWidth
              value={candidateData.candidateName}
              onChange={handleChange} 
              variant="outlined"
              name="candidateName"
              className="my-5 bg-gray-50 rounded-lg"
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
          </Box>

          <Box>
            <TextField
              label="Email"
              fullWidth
              value={candidateData.candidateEmail}
              onChange={handleChange}
              variant="outlined"
              name="candidateEmail"
              className="my-5 bg-gray-50 rounded-lg"
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
          </Box>

          <Box>
            <TextField
              label="Contact no."
              fullWidth
              value={candidateData.candidateNumber}
              onChange={handleChange}
              variant="outlined"
              name="candidateNumber"
              className="my-5 bg-gray-50 rounded-lg"
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
          </Box>

          <Box>
            <TextField
              label="College name"
              fullWidth
              value={candidateData.candidateCollege}
              onChange={handleChange}
              variant="outlined"
              name="candidateCollege"
              className="my-5 bg-gray-50 rounded-lg"
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
          </Box>

          <Box>
            <TextField
              label="Course"
              fullWidth
              value={candidateData.candidateCourse}
              onChange={handleChange}
              variant="outlined"
              name="candidateCourse"
              className="my-5 bg-gray-50 rounded-lg"
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
          </Box>

          <Box>
            <TextField
              label="Branch"
              fullWidth
              value={candidateData.candidateBranch}
              onChange={handleChange}
              variant="outlined"
              name="candidateBranch"
              className="my-5 bg-gray-50 rounded-lg"
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
          </Box>

          <Box>
            <TextField
              label="City"
              fullWidth
              value={candidateData.candidateCity}
              onChange={handleChange}
              variant="outlined"
              name="candidateCity"
              className="my-5 bg-gray-50 rounded-lg"
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
          </Box>
          
      </Box>
    </Box>
  </Box>
</Can_Layout>

{/* ------------------------------- LOGOUT MODAL -------------------------- */}
{/* ------------------------------- LOGOUT MODAL -------------------------- */}
{/* ------------------------------- LOGOUT MODAL -------------------------- */}

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

{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}

  <Snackbar
    open={modalMsg.open}
    autoHideDuration={3000}
    onClose={() => setModalMsg({ ...modalMsg, open: false })}
    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
  >
    <Alert onClose={() => setModalMsg({ ...modalMsg, open: false })} severity={modalMsg.severity} sx={{ width: '100%' }}>
      <b>{modalMsg.message}</b>
    </Alert>
  </Snackbar>
</>
  );
};

export default CanProfile;