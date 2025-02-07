import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';

import {Button} from "@mui/material"

const Test = () => {

  const { backendUrl } = useContext(DataContext);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const serverResponse = { domain: 'Express.js', level: 'Hard' };

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(`${backendUrl}/generate-questions`, serverResponse);
      console.log('Raw Server Response:', response.data);
  
      // Check if response.data is a string and parse it
      const parsedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  
      if (Array.isArray(parsedData)) {
        setQuestions(parsedData);
      } else {
        setError('Invalid data format received.');
      }
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
          <li key={index} className="text-gray-800">
            {Object.values(questionObj)[0]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
