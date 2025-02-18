import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@mui/material";

const Can_Rating = () => {
  const [hoveredRating, setHoveredRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const reviews = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRating === null) {
      setError(true);
      return;
    }

    const feedbackData = {
      rating: selectedRating,
      comment: comment,
    };
    console.log("feedback Submitted:", feedbackData);
    alert("Thanks for your feedback!");

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
                    setError(false);
                }}
                onMouseEnter={() => setHoveredRating(index+1)}
                onMouseLeave={() => setHoveredRating(null)}
              />
            ))}
          </div>

          {/* ---------------review after star click------------- */}
          {selectedRating != null && (
            <p className="mt-2 text-lg font-semibold text-gray-700">
              {reviews[selectedRating-1]}
            </p>
          )}
        </div>

        {error && alert("rating is mandatory")}
        {/* -----------------star rating END-------------------? */}


        {/* --------------Comment Box-------------------- */}
        <textarea
          className="w-full border rounded-md mt-7 min-h-24"
          placeholder="Share your Thoughts.. (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2 rounded-lg transition mt-3 "
          onClick={handleSubmit}
        >
          Submit feedback
        </Button>
      </div>
    </div>
  );
};

export default Can_Rating;
