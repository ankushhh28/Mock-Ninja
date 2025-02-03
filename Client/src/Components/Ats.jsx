import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import atsCheck from "../assets/images/atsCheck.png";

export default function Ats() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  return (
    <div className="flex flex-row bg-gradient-to-b from-[#c28ceb] to-[#8667F2] text-white rounded-3xl m-8 w-full mb-20">
    <section className="flex flex-row md:flex-col">
      {/* Text Section------------------------------------------------------------------ */}
      <div className="flex flex-col justify-center text-center ml-16 p-8 w-full">
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
        
      {/* Text Section------------------------------------------------------------------------------------ */}

        {/* For LoggedIn Users Only----------------------------------------------------------*/}
        <div className="rounded-lg border-dashed border-2 border-white mt-8 p-6 inline-block">
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
        </div>
        {/* For LoggedIn Users Only--------------------------------------------------------------------------------*/}

      </div>

      {/* Not LoggedIn Users------------------------------------------------------------ */}
              
              {/* Button */}

      {/* Not LoggedIn Users----------------------------------------------------------------------- */}
      
      
    </section>
    {/* Image Section---------------------------------------------------------------------------- */}
    <div className="rounded-lg z-10 mt-7 mb-7">
        <img
          src={atsCheck}
          alt="atsCheck"
          className="max-w-2xl h-96 rounded-lg"
        />
  </div>
      {/* Image Section---------------------------------------------------------------------------- */}

    </div>
  );
}
