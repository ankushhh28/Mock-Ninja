// import React from "react";
// import CopyrightIcon from "@mui/icons-material/Copyright";

// const Footer = () => {
//   return (
//     <footer className="bg-[#8667F2] text-white w-full min-h-[50vh] py-16 px-10 sm:px-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Main Footer Sections */}
//         <div className="flex flex-wrap justify-between gap-10">
//           {/* About Us */}
//           <div className="max-w-sm">
//             <h2 className="text-3xl font-semibold mb-4">About Us</h2>
//             <p className="text-lg opacity-90">
//               AI-powered interview platform to help job seekers practice, get ATS scores,
//               and gain confidence with real-time feedback.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="flex flex-col">
//             <h2 className="text-3xl font-semibold mb-4">Quick Links</h2>
//             <ul className="space-y-3 text-lg opacity-90">
//               <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
//               <li><a href="#" className="hover:text-gray-300 transition">AI Interview</a></li>
//               <li><a href="#" className="hover:text-gray-300 transition">Real Interview</a></li>
//               <li><a href="#" className="hover:text-gray-300 transition">Resume ATS Score</a></li>
//               <li><a href="#" className="hover:text-gray-300 transition">Contact Us</a></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="flex flex-col">
//             <h2 className="text-3xl font-semibold mb-4">Contact</h2>
//             <p className="text-lg opacity-90">Email: abc@gmail.com</p>
//             <p className="text-lg opacity-90">Phone: +91 7869863059</p>
//           </div>

//           {/* Legal Section */}
//           <div className="flex flex-col">
//             <h2 className="text-3xl font-semibold mb-4">Legal</h2>
//             <ul className="space-y-3 text-lg opacity-90">
//               <li><a href="#" className="hover:text-gray-300 transition">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-gray-300 transition">Terms & Conditions</a></li>
//               <li><a href="#" className="hover:text-gray-300 transition">Refund Policy</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <div className="border-t border-white mt-16 pt-6 flex items-center justify-center text-lg opacity-90">
//           <CopyrightIcon className="mr-2" />
//           <span>2025 AI Interview Platform. All Rights Reserved.</span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Box, Typography } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Logo from "../assets/Logo.png"

const Footer = () => {
  return (
    <Box
      className="w-screen h-auto mt-12"
      sx={{
        backgroundColor: "#8667F2",
        color: "white",
        padding: { xs: "20px 10px", sm: "20px 20px" },
        mt: "5px",
        position: "relative",
      }}
    >
      {/* -------------------------------------------------------------------------------------- */}

      <Box className="flex flex-col sm:flex-row justify-between  py-6 sm:py-6 px-6 sm:px-20">
        {/* Logo */}
        <Box>
          <img src={Logo} alt="Logo" className="h-60 sm:h-80 " />
        </Box>

        {/* Links */}
        <Box className="flex flex-col sm:flex-row gap-8 sm:gap-14">
          <Box className="flex flex-col gap-4">
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">Home</Box>
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">
              AI Interview
            </Box>
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">
              Real Interview
            </Box>
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">
              Resume ATS Score
            </Box>
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">
              Real Interview
            </Box>
          </Box>
          <Box className="flex flex-col gap-4">
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">About</Box>
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">Contact Us</Box>
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">
              Terms Of Service
            </Box>
            <Box className="hover:text-gray-300 cursor-pointer text-lg sm:text-xl">Privacy</Box>
          </Box>
        </Box>
      </Box>

      {/* -------------------------------------------------------------------------------------- */}

      <Box className="px-6 sm:px-16 mb-8">
        <Box className="flex flex-nowrap items-center border-[1px] border-white p-4 w-fit rounded-[30px] cursor-pointer hover:bg-gray-700">
          <StarIcon className="text-[1.4rem] mr-3 text-yellow-500" />
          <Typography className="text-sm sm:text-[1.1rem]">
            Top Profiles <KeyboardArrowDownIcon />
          </Typography>
        </Box>
      </Box>

      {/* -------------------------------------------------------------------------------------- */}

      <Box className="px-6 sm:px-16 sm:pr-28 mb-12 flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <Box className="text-center sm:text-left">
          <Typography className="mt-4 text-sm sm:text-base">
            13,Nanak Nagar Indore 452001 M.P.
          </Typography>
          <Typography className="mt-2 text-sm sm:text-base">
            © 2025 AI Interview Platform. All Rights Reserved.
          </Typography>
        </Box>

        {/* Social Media Section */}
        <Box className="flex gap-4 mt-4 sm:mt-0">
          <LinkedInIcon className="text-[2rem] sm:text-[3rem] cursor-pointer hover:text-blue-500" />
          <TwitterIcon className="text-[2rem] sm:text-[3rem] cursor-pointer hover:text-blue-400" />
          <InstagramIcon className="text-[2rem] sm:text-[3rem] cursor-pointer hover:text-pink-500" />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
