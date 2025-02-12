// import axios from "axios"


// const GEMINI_API_KEY = "AIzaSyCaj43zovAZiccZzdpuU68lcbWsTXTYnKI"; 
// const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// export const gestureFeedback = async (req, res) => {
//   const { interviewData } = req.body;

//   console.log(interviewData);
  

//   const expressionCount = {};
//   let totalConfidence = 0;
//   let eyeContactCount = { direct: 0, indirect: 0 };
//   let postureIssues = { good: 0, tilted: 0, movement: 0 };
//   let handMovements = { minor: 0, excessive: 0, none: 0 };

//   interviewData.forEach(entry => {
//     expressionCount[entry.expression] = (expressionCount[entry.expression] || 0) + 1;
//     totalConfidence += entry.confidence;

//     if (entry.eyeContact === 'Direct Eye Contact') eyeContactCount.direct++;
//     else eyeContactCount.indirect++;

//     if (entry.posture === 'Good Posture') postureIssues.good++;
//     else if (entry.posture === 'Head Tilt Detected') postureIssues.tilted++;
//     else if (entry.posture === 'Excessive Body Movement') postureIssues.movement++;

//     if (entry.handGesture === 'Minor Hand Movement Detected') handMovements.minor++;
//     else if (entry.handGesture === 'Excessive Hand Movement Detected') handMovements.excessive++;
//     else handMovements.none++;
//   });

//   const dominantExpression = Object.keys(expressionCount).reduce((a, b) =>
//     expressionCount[a] > expressionCount[b] ? a : b
//   );

//   const averageConfidence = (totalConfidence / interviewData.length).toFixed(2);

//   const requestBody = {
//     contents: [
//       {
//         parts: [
//           {
//             text: `Analyze the following interview performance:
//               - Dominant expression: ${dominantExpression}
//               - Average confidence: ${averageConfidence}
//               - Eye contact: Direct (${eyeContactCount.direct}), Indirect (${eyeContactCount.indirect})
//               - Posture: Good (${postureIssues.good}), Tilted (${postureIssues.tilted}), Movement Issues (${postureIssues.movement})

//               Provide JSON feedback with:
//               {
//                 "strengths": "...",
//                 "areas_for_improvement": "...",
//                 "suggestions": "..."
//               }
//               Give feedback in a simple english language and feedback should be small and understandable
//               Do NOT include any code blocks or markdown formatting.`
//           }
//         ]
//       }
//     ]
//   };

//   try {
//     const response = await axios.post(
//       `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
//       requestBody,
//       { headers: { 'Content-Type': 'application/json' } }
//     );

//     const feedbackText = response.data.candidates[0]?.content?.parts[0]?.text;
//     // console.log('Raw API Response:', feedbackText);

//     const feedback = JSON.parse(feedbackText);
//     res.json(feedback);

//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);

//     if (error instanceof SyntaxError) {
//       res.status(500).json({ error: 'Invalid JSON response from Gemini API' });
//     } else {
//       res.status(500).json({ error: 'Failed to get feedback from Gemini API' });
//     }
//   }
// }

import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCaj43zovAZiccZzdpuU68lcbWsTXTYnKI";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const gestureFeedback = async (req, res) => {
  const { interviewData } = req.body;

  console.log(interviewData);
  
  const expressionCount = {};
  let totalConfidence = 0;
  let eyeContactCount = { direct: 0, indirect: 0 };
  let postureIssues = { good: 0, tilted: 0, movement: 0 };
  let handMovements = { minor: 0, excessive: 0, none: 0 };
  let noFaceCount = 0;

  interviewData.forEach(entry => {
    if (entry.noFace) {
      noFaceCount++;
      return; // Skip processing if no face was detected
    }

    expressionCount[entry.expression] = (expressionCount[entry.expression] || 0) + 1;
    totalConfidence += entry.confidence;

    if (entry.eyeContact === 'Direct Eye Contact') eyeContactCount.direct++;
    else eyeContactCount.indirect++;

    if (entry.posture === 'Good Posture') postureIssues.good++;
    else if (entry.posture === 'Head Tilt Detected') postureIssues.tilted++;
    else if (entry.posture === 'Excessive Body Movement') postureIssues.movement++;

    if (entry.handGesture === 'Minor Hand Movement Detected') handMovements.minor++;
    else if (entry.handGesture === 'Excessive Hand Movement Detected') handMovements.excessive++;
    else handMovements.none++;
  });

  const dominantExpression = Object.keys(expressionCount).reduce((a, b) =>
    expressionCount[a] > expressionCount[b] ? a : b,
    Object.keys(expressionCount)[0] || "Neutral"
  );

  const averageConfidence = interviewData.length > noFaceCount
    ? (totalConfidence / (interviewData.length - noFaceCount)).toFixed(2)
    : "N/A";

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `Analyze the following interview performance:
              - Dominant expression: ${dominantExpression}
              - Average confidence: ${averageConfidence}
              - Eye contact: Direct (${eyeContactCount.direct}), Indirect (${eyeContactCount.indirect})
              - Posture: Good (${postureIssues.good}), Tilted (${postureIssues.tilted}), Movement Issues (${postureIssues.movement})
              - No Face Detected Count: ${noFaceCount}
              
              Provide JSON feedback with:
              {
                "strengths": "...",
                "areas_for_improvement": "...",
                "suggestions": "..."
              }
              Give feedback in simple English and keep it short and understandable.
              Do NOT include any code blocks or markdown formatting.`
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const feedbackText = response.data.candidates[0]?.content?.parts[0]?.text;
    const feedback = JSON.parse(feedbackText);
    res.json(feedback);

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);

    if (error instanceof SyntaxError) {
      res.status(500).json({ error: 'Invalid JSON response from Gemini API' });
    } else {
      res.status(500).json({ error: 'Failed to get feedback from Gemini API' });
    }
  }
};