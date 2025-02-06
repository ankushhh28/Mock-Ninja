import React, { useContext, useState, useRef } from "react";
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
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { DataContext } from "../Context/DataProvider";
import { useNavigate } from "react-router-dom";

const CanProfile = () => {
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // --------------------------------Use States----------------------------------------//
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  // ----------------------------Functions----------------------------------------------//
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(event);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // console.log(imageUrl)
      setProfileImage(imageUrl);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  //---------------------------------------------------------------------------------------------------//

  return (
    <>
      <Can_Layout>
        <Box className="h-auto w-screen py-6">
          {/* ---------------------------------------------------------------------------------------- */}

          <Box className="flex justify-between mx-4 sm:mx-16 pb-4 border-b-2 border-b-gray-300">
            <Typography className="font-bold text-[17px] sm:text-[20px] mt-1 text-black">
              Profile
            </Typography>

            <Button
              onClick={() => setOpen(true)}
              variant="outlined"
              className="normal-case font-bold text-[13px] sm:text-[18px] text-white rounded-[30px] bg-gradient-to-r from-red-400
  to-red-700 border-red-600"
            >
              <span>
                <LogoutIcon className="text-[20px] mr-2 font-extrabold" />
              </span>
              Logout
            </Button>
          </Box>

          {/* ------------------------------Main Container------------------------------ */}

          <Box className="flex flex-col gap-8 w-[90%] md-w-[75%] h-auto bg-gray-100  py-6   mx-auto  my-9 ">
            {/* -----------------------Buttons--------------------- */}

            <Box className="flex gap-6 justify-between  md:justify-end px-2">
              <Button
                type="submit"
                variant="outlined"
                className="flex items-center justify-center normal-case font-bold text-[12px] sm:text-[18px] text-white rounded-[30px] bg-gradient-to-r from-blue-400 to-blue-700 border-blue-600"
              >
                <span>
                  <TurnedInIcon className="text-[20px] mr-2 font-extrabold" />
                </span>
                Save Changes
              </Button>

              <Button
                onClick={handleEditClick}
                variant="outlined"
                className="flex items-center justify-center normal-case font-bold text-[12px] sm:text-[18px] text-white rounded-[30px] bg-gradient-to-r from-blue-400 to-blue-700 border-blue-600"
              >
                <span>
                  <EditIcon className="text-[20px] mr-2 font-extrabold" />
                </span>
                Edit Profile
              </Button>
            </Box>

            {/* -----------------Form Section----------------------------- */}
            <Box className=" flex flex-col  w-full md:w-[75%] px-12 py-6 rounded-3xl mx-auto">
              <form action="/">
                {/* -------------------------------------------------------------------------- */}
                <Box className="flex justify-center mb-8 ">
                  <Badge
                    color="info"
                    overlap="circular"
                    badgeContent={<EditIcon fontSize="small" />}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    onClick={handleAvatarClick}
                  >
                    {
                      <Avatar
                        src={profileImage}
                        className="w-28 h-28 cursor-pointer"
                      />
                    }
                  </Badge>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isEditing}
                  />
                </Box>
                {/* -------------------------------------------------------------------------- */}

                <Box className="w-full ">
                  <TextField
                    label="Name"
                    fullWidth
                    // placeholder="Enter your Email"
                    variant="outlined"
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
                    // placeholder="Enter your Email"
                    variant="outlined"
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
                    // placeholder="Enter your Email"
                    variant="outlined"
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
                    // placeholder="Enter your Email"
                    variant="outlined"
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
                    // placeholder="Enter your Email"
                    variant="outlined"
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
                    // placeholder="Enter your Email"
                    variant="outlined"
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
                    // placeholder="Enter your Email"
                    variant="outlined"
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
              </form>
            </Box>
          </Box>
        </Box>
      </Can_Layout>

      {/* --------------------------- LOGOUT MODAL -------------------------- */}
      {/* --------------------------- LOGOUT MODAL -------------------------- */}
      {/* --------------------------- LOGOUT MODAL -------------------------- */}

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
    </>
  );
};

export default CanProfile;
