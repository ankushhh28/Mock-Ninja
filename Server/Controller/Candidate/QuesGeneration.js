import axios from "axios";
import multer from 'multer';
import * as pdfjsLib from 'pdfjs-dist';


const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = "AIzaSyAjn5ZlEdmcKjtyPQ0Cyeqvi_stG07d1Lo";

// ------------- PROMPT FOR GENERATING DOMAIN & SKILLS QUESTIONS -------------

async function generateQuestionsWithGemini(domain, level) {
  const prompt = `
  Based on the following criteria, generate **non-repetitive** and **real** interview questions.
  
  **Criteria:**
  - **Domain:** ${domain}
  - **Level:** ${level}
  
  **Rules:**
  1. Generate exactly 12 questions in the following sequence:
     - Question 1: Tell me about yourself or Introcude your self (Type Question).
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

  **GIVE QUESTIONS IN RULE 3 FORMAT ONLY**
  **DONT USE COMMA IN A QUESTION INSTEAD OF COMMA USE "or" ONLY**
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

    return response.data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error("Error generating questions:", error.response ? error.response.data : error.message);
    return "Error generating questions.";
  }
}

// ---------------- DOMAIN & SKILLS QUESTION GENERATION ---------------

export const domainSkillQuesGeneration = async(req, res) => {
  const { domain, level } = req.body;

  try {
    const questions = await generateQuestionsWithGemini(domain, level);
    res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({message:"Something went wrong! Try again later"})
  }
}

// ------------- PROMPT FOR GENERATING RESUME QUESTIONS -------------

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const extractTextFromPDF = async (buffer) => {
  try {
    const pdfData = new Uint8Array(buffer);
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let text = '';

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ');
    }
    return text.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return null;
  }
};

const generateQuestionsWithGeminis = async (resumeText) => {
  const prompt = `
    Based on the following resume content, generate non-repetitive and real interview questions.

    Resume Content:
    ${resumeText}

    first check if the uploaded text is an resume text or not?
    if the text is not an type of resume text then ONLY SHOW this message

    "NOT AN RESUME"

    Rules:
    1. Generate exactly 12 questions in the following sequence:
       - Question 1: Tell me about yourself or Introcude your self (Type Question).
       - Questions 2-4: Basic Technical questions (non-coding).
       - Questions 5-7: Intermediate Technical questions (non-coding).
       - Questions 8-10: Project-related questions.
       - Questions 11-12: Managerial questions.
    2. Ensure questions are relevant to the skills and experience in the resume.
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

    ❗ IMPORTANT:STRICTLY FOLLOW RULE NUMBER 3. 
    ❗ IMPORTANT:STRICTLY FOLLOW RULE NUMBER 3. 
    ❗ IMPORTANT:STRICTLY FOLLOW RULE NUMBER 3. 
  `;

  const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  const data = await response.json();
  // console.log('Gemini API Response:', data); 

  if (!data.candidates || !data.candidates[0]) {
    throw new Error('Invalid response from Gemini API');
  }
  
  return data.candidates[0].content.parts[0].text;
};

// ---------------- RESUME QUESTION GENERATION ---------------

export const resumeQuesGeneration = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // console.log('Buffer size:', req.file.buffer.length); // Debug buffer size

    const resumeText = await extractTextFromPDF(req.file.buffer);
    if (!resumeText) {
      return res.status(500).json({ error: 'Unable to read resume! Try again later' });
    }

    const questions = await generateQuestionsWithGeminis(resumeText);
    // console.log('Generated Questions:', questions); // Debug generated questions

    if(questions === "NOT AN RESUME"){
      return res.status(400).json({message:"Your uploaded file is not resume"})
    }

    res.json({ questions });

  } catch (error) {
    // console.error('Detailed Error:', error);
    res.status(500).json({ error: 'Failed to process the file.' });
  }
};