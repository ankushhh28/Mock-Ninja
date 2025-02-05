import { useContext, useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import atsCheck from "../../assets/images/atsCheck.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Button } from "@mui/material";
import { DataContext } from "../../Context/DataProvider";

export default function Ats() {

  const { setBeforeLogin, account } = useContext(DataContext)

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

// ----------------------------- GSAP ANIMATIN -----------------------------
// ----------------------------- GSAP ANIMATIN -----------------------------

  gsap.registerPlugin(ScrollTrigger)

  const LaptopRef = useRef(null)

  useGSAP(() => {
  gsap.from(LaptopRef.current, {
    x:100,
    delay:0.5,
    opacity:0,
    scrollTrigger:{
      trigger:LaptopRef.current,
    }
  })})

  return (
<Box className="bg-[#f5f3ff] h-fit py-10">

<div className="flex flex-col lg:flex-row bg-gradient-to-b from-[#c28ceb] to-[#8667F2] text-white 
rounded-3xl lg:ml-8 w-full">

<section className="flex flex-col lg:flex-row w-full">

  <div className="flex flex-col justify-center text-center lg:ml-16 p-8 w-full">

    <h2 className="text-lg font-semibold tracking-wide uppercase">
      Free Resume Checker
    </h2>

    <h1 className="text-4xl font-bold mt-2">
      Get AI feedback on your resume instantly
    </h1>

    <p className="mt-4 text-lg text-gray-200">
      Our <span className="font-bold">free</span> AI-powered
      resume checker scores your resume on key criteria recruiters and
      hiring managers look for. Get actionable steps to revamp your resume
      and <span className="font-bold">land more interviews.</span>
    </p>        

    <div className="rounded-lg border-dashed border-2 border-white mt-8 p-6 flex justify-center">

      {account.name === "" ? (
              <Button
              onClick={() => setBeforeLogin(true)}
              variant="contained"
              className="normal-case text-primary bg-white px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
            >
              Upload your resume
            </Button>
      ): (
        <>
        <label
        htmlFor="resume-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <FaCloudUploadAlt className="mb-2" />
        <p className="text-white font-medium">
          {uploadedFile
            ? uploadedFile
            : "Drop your resume here or choose a file."}
        </p>
      </label>
      <input
        type="file"
        id="resume-upload"
        className="hidden"
        onChange={handleFileUpload}
      />
     </>
      )}
      </div>
      
    </div>
 
    </section>
      <div className="flex w-full rounded-lg z-10 sm: mt-7 mb-7 justify-center lg:justify-end">
        <img
        ref={LaptopRef}
          src={atsCheck}
          alt="atsCheck"
          className="max-w-full lg:max-w-2xl h-48 lg:h-auto rounded-lg"
        />
    </div>

    </div>
    </Box>
  );
}
