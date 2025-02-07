import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';

import {Button} from "@mui/material"

const Test = () => {

  const { backendUrl } = useContext(DataContext);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const serverResponse = { domain: 'App Development', level: 'Hard' };

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(`${backendUrl}/generate-questions`, serverResponse);
      const cleanedData = response.data.replace(/```json|```/g, "");
      const parsedData = JSON.parse(cleanedData);
      setQuestions(parsedData)
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.error || 'Error fetching questions.');
    }
  };
  

  return (
<div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generated Interview Questions</h1>

      {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}

      <Button onClick={fetchQuestions} className="mb-4">
        Generate Questions
      </Button>

      <ul className="list-disc ml-6 space-y-2">
        {questions.map((questionObj, index) => (
          <div key={index} className="text-gray-800">
            {Object.values(questionObj)}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Test;
