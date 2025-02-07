import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FaExclamationCircle } from "react-icons/fa";
import { CanDataContext } from '../../Context/CanDataProvider';

const ProfileComplete = () => {
  
  const { canAccount } = useContext(CanDataContext) || {}; // Ensure canAccount is never null/undefined

  const [profileCompleted, setProfileCompleted] = useState(
    JSON.parse(localStorage.getItem("ProfileCompleted")) || false
  );

  // useEffect(() => {
  //   if (!canAccount) return; // Avoid running if canAccount is undefined

  //   // Provide default values if any property is missing
  //   const {
  //     candidateBranch = "",
  //     candidateCity = "",
  //     candidateCollege = "",
  //     candidateCourse = "",
  //     candidateNumber = "",
  //     candidatePicture = ""
  //   } = canAccount || {};

  //   const isProfileComplete =
  //     candidateBranch !== "" &&
  //     candidateCity !== "" &&
  //     candidateCollege !== "" &&
  //     candidateCourse !== "" &&
  //     candidateNumber !== "" &&
  //     candidatePicture !== "";

  //   setProfileCompleted(isProfileComplete);
  //   localStorage.setItem("ProfileCompleted", JSON.stringify(isProfileComplete));
  // }, [canAccount]); 

  return (
    <>
{/*       {!profileCompleted && (
        <Box className="bg-red-200 h-12 sm:h-16 w-full flex justify-center items-center">
          <Typography className="text-black font-bold text-[13px] sm:text-lg flex items-center gap-2">
            <FaExclamationCircle className="text-red-600 text-[18px] sm:text-[22px]" />
            To unlock AI practice mock, first complete your profile.
          </Typography>
        </Box>
      )} */}
    </>
  );
};

export default ProfileComplete;
