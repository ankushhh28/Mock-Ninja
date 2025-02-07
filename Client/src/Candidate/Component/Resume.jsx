import React, { useContext, useState } from 'react';
import axios from 'axios';
import {DataContext} from "../../Context/DataProvider"

const Resume = () => {

  const { backendUrl } = useContext(DataContext)

  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }
    setLoading(true);
    setError('');
    setQuestions([]);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post(`${backendUrl}/Can/Resume-Generate-Questions`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setQuestions(response.data.questions.split('\n'));
    } catch (err) {
      setError('Failed to process the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Resume Question Generator</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? 'Generating...' : 'Upload & Generate Questions'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        {questions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Generated Questions:</h2>
            <ul className="list-decimal ml-6 space-y-2">
              {questions.map((q, index) => (
                <div key={index} className="text-gray-800">{q}</div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
