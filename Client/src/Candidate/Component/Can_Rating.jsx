import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";
import axios from "axios";

const Can_Rating = () => {

  const { mockID } = useParams()
  const { backendUrl, account } = useContext(DataContext)
  const email = account.email

  const navigate = useNavigate()

  // ----------------- USE STATES -----------------------

  const [hoveredRating, setHoveredRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [comment, setComment] = useState("");
  const [modalMsg, setModalMsg] = useState({
    open: false,
    msg: "",
    severity: "",
  });

  // ----------------- RETINGS --------------------

  const reviews = ["Needs Improvement", "Average", "Good", "Very Good", "Excellent"];

  // --------------- SUBMITTING FEEDBACK -------------

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (selectedRating === null) {
      setModalMsg({open:true, msg:"Please rate before continuing.", severity:"error"})
      return;
    }

    const serverData = {
      email, mockID, rating:selectedRating, comment,role:"Candidate"
    }
    try {
      const response = await axios.post(`${backendUrl}/Can/Saving-User-Experience-Feedback`,serverData,{
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        }
      })
      if(response.status === 200){
        setModalMsg({open:true, msg:response?.data?.message || "Check Your Conntection! Try Later.", severity:"success"});
        setTimeout(() => {
          navigate(`/Feedback/${mockID}`)
        },1000)
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
    }

    setSelectedRating(null);
    setHoveredRating(null);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-700 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-5/6 sm:w-96 text-center min-h-88">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
          Share your Experience!
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          your feedback helps us improve and serve u better.
        </p>

        {/* ------------------- star rating----------------- */}
        <div className="flex flex-col items-center mt-4">
        {/* ---------------review after star click------------- */}
          {selectedRating != null && (
            <p className="mb-3 text-lg font-semibold text-gray-700">
              {reviews[selectedRating-1]}
            </p>
          )}

          {/* --------------- START RATING ----------------- */}

          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-3xl cursor-pointer ${
                  (hoveredRating !== null ? hoveredRating : selectedRating) >=
                  index+1
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-yellow-400"
                }`}
                onClick={() =>{ 
                    setSelectedRating(index+1);
                }}
                onMouseEnter={() => setHoveredRating(index+1)}
                onMouseLeave={() => setHoveredRating(null)}
              />
            ))}
          </div>
        </div>


        {/* --------------Comment Box-------------------- */}
        <TextField
        multiline
        rows={3}
        className="w-full border rounded-md mt-7 min-h-24"
        placeholder="Share your Thoughts.. (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
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

        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2 rounded-lg transition mt-3 "
          onClick={handleSubmit}
        >
          Submit feedback
        </Button>
      </div>

{/* -------------------- SANCK BAR --------------------- */}

<Snackbar
  open={modalMsg.open}
  className="mt-4"
  autoHideDuration={3000}
  onClose={() => setModalMsg({ ...modalMsg, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setModalMsg({ ...modalMsg, open: false })}
    severity={modalMsg.severity}
    sx={{ width: "100%" }}
  >
    <b>{modalMsg.msg}</b>
  </Alert>
</Snackbar>

    </div>
  );
};

export default Can_Rating;
