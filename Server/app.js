// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";
import axios from "axios";
import bodyParser from "body-parser";

import ConnectionDB from "./Database/Database.js";
import Router from "./Routes/Routes.js";
import CandidateRouter from "./Routes/CandidateRoute.js";

dotenv.config();

const app = express();
const numCPUs = os.cpus().length;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routers
app.use("/", Router);
app.use("/Can", CandidateRouter);

// Gemini API Config
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = "AIzaSyDRTXIWOeecfaLpDK78sD8qOG6bNX86r2U";



// Function to generate interview questions
async function generateQuestionsWithGemini(domain, level) {
  const prompt = `
  Based on the following criteria, generate **non-repetitive** and **relevant** interview questions.
  
  **Criteria:**
  - **Domain:** ${domain}
  - **Level:** ${level}
  
  **Rules:**
  1. Generate exactly 12 questions in the following sequence:
     - Question 1: A general introductory question.
     - Questions 2-4: Basic Technical questions (non-coding).
     - Questions 5-8: Intermediate Technical questions (non-coding).
     - Questions 9-10: Hard Technical questions (non-coding).
     - Questions 11-12: Managerial questions.
  2. Ensure questions are varied in difficulty, based on the level (Basic, Intermediate, Advanced).
  3. **STRICTLY** provide the questions in the following **JSON format**:
     [
       { "question:1": "Your first question here" },
       { "question:2": "Your second question here" },
       { "question:3": "Your third question here" },
       ...
       { "question:12": "Your twelfth question here" }
     ]
  4. **DO NOT** include any category headings like "Introductory", "Basic Technical", or any extra text outside of the JSON array.
  5. **STRICTLY FOLLOW RULE NUMBER 3** — no explanations, no numbering outside the JSON format.
  6. **Exclude any coding-specific questions.**
  
  ❗ IMPORTANT:
  - Only output the JSON array as shown in Rule 3.
  - Do NOT add any markdown formatting, bullet points, or additional descriptions.
  - Do NOT include text like "**Intermediate Technical Questions (Non-Coding):**" or "**Hard Technical Questions:**".
  - The output should be clean JSON, ready for parsing.
  
  STRICTLY FOLLOW RULE NUMBER 3.
  STRICTLY FOLLOW RULE NUMBER 3.
  STRICTLY FOLLOW RULE NUMBER 3.
  `;
  



  try {

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating questions:", error.response ? error.response.data : error.message);
    return "Error generating questions.";
  }
}

// API Endpoint for generating interview questions
app.post("/generate-questions", async (req, res) => {
  const { domain, level } = req.body;




  if (!domain || !level) {
    return res.status(400).json({ error: "Please provide both domain and level." });
  }

  const questions = await generateQuestionsWithGemini(domain, level);
  res.json({ questions });
});

// Start Server
const StartServer = () => {
  const PORT = process.env.PORT_NUMBER || 5000;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  ConnectionDB();
};

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  StartServer();
}