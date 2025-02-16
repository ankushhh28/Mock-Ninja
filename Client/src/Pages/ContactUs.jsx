import React, { useState } from "react";
import Layout from "../Layout/Layout";

import { TextField, Button } from "@mui/material";

import { FaPhone } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import map from "../assets/images/map.png";

const ContactUs = () => {
  // ---------------------------- USE STATES -----------------------------
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contact = [
    {
      icon: <FaPhone className="text-primary  text-2xl sm:text-4xl" />,
      title: "Phone",
      details: "+917869863059",
    },
    {
      icon: <IoLogoWhatsapp className="text-primary text-2xl sm:text-4xl" />,
      title: "Whatsapp",
      details: "+917869863059",
    },
    {
      icon: <MdEmail className="text-primary text-2xl sm:text-4xl" />,
      title: "Email",
      details: "mockninja@gmail.com",
    },
    {
      icon: <MdLocationPin className="text-primary text-2xl sm:text-4xl" />,
      title: "Location",
      details: "13, Nanak Nagar Bholaram Indore(M.P.), 452001",
    },
  ];

  // --------------------- HANDLING ONCHANGE -----------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// ------------------- HANDLING FORM SUBMIT -------------------------

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    formData.name = "";
    formData.email = "";
    formData.subject = "";
    formData.message = "";
  };

  return (
    <Layout>
      <div className="w-full px-6 md:px-16 py-10 max-w-8xl mx-auto  bg-[#f5f3ff]">
        {/* ------------------------- Heading Section ----------------------------- */}

        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide underline decoration-gray-400  decoration-2 sm:decoration-3 underline-offset-8 mb-4 sm:mb-8">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any queries, support, or collaboration
            opportunities. We’re happy to assist you!
          </p>
        </div>

        {/* ------------------- Contact Info & Form Section ----------------------- */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center border-2  px-6 sm:px-12 md:px-16 py-4 sm:py-8  rounded-lg sm:rounded-3xl border-purple-200 bg-gray-50 ">

          {/* ------------------ Contact Info ------------------------------------ */}

          <div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">

              {/* ---------------- Grid Mapping ----------------------------------- */}

              {contact.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-r from-purple-50  to-purple-100 rounded-lg sm:rounded-xl shadow-lg transition-transform transform hover:scale-105 border border-purple-200"
                >
                  {data.icon}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">
                    {data.title}
                  </h3>
                  <p className="text-base text-wrap text-gray-600 text-center mt-2">
                    {data.details}
                  </p>
                </div>
              ))}
            </div>
            {/* ---------------- Grid Mapping End ------------------------ */}

            <div className="mt-6">
              <img
                src={map}
                alt="Map"
                className="w-full h-56 sm:h-64 rounded-xl shadow-lg border border-gray-300 hover:scale-95 transition-all"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/place/IT+park+indore/@22.6857302,75.8706175,17z/data=!4m6!3m5!1s0x3962fd11cbaf30c5:0xeddd100ed6a7f182!8m2!3d22.6857253!4d75.8731924!16s%2Fg%2F11khf07p30?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
                    "_blank"
                  )
                }
              />
            </div>
          </div>

          {/* ------------------ Contact Form ----------------------------- */}
          
          <div className="bg-purple-50 border border-purple-200 p-8 rounded-xl shadow-lg w-full">
            <h2 className="text-2xl sm:text-3xl  font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className=" text-gray-600 text-base sm:text-lg mb-6">
              Fill out the form below and we will get back to you as soon as
              possible.
            </p>
            <form
              className="flex flex-col space-y-8"
              onSubmit={handleFormSubmit(event)}
            >
              <TextField label="Name" variant="outlined" fullWidth  onChange={handleChange}/>
              <TextField label="Email" variant="outlined" fullWidth onChange={handleChange} />
              <TextField label="Subject" variant="outlined" fullWidth  onChange={handleChange}/>
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                className="normal-case text-white bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8]  py-2 font-bold text-base sm:text-lg rounded-xl  transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
