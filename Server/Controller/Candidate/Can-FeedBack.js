import axios from "axios";
import FeedbackSchema from "../../Models/FeedbackSchema.js";
import QuesGenSchema from "../../Models/QuesGenSchema.js";
import RatingSchema from "../../Models/RatingSchema.js";

const GEMINI_API_KEY = "AIzaSyDRzA1WoMPiI8Jkck7dJWvb_i7Fo4OyIBY";
const GEMINI_API_URL =
"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

// ----------- SAVING FEEDBACKs TO CANDIDATE PROFILE --------------

export const SavingOverallFeedback = async (data, mockId) => {
  try {
    const newData = new FeedbackSchema({
      mockId,
      QuestionAnswerFeedback: data,
    });
    await newData.save();
    return "Successfully Saved";
  } catch (error) {
    return "Error while Saving Questions";
  }
};

// ------------ SAVING QUESTION & ANSWER ---------------------

export const SavingQuestionAsnwer = async(userAnswer,mockId,email) => {

  const data = JSON.stringify(userAnswer)
  try {
    const questionDoc = await QuesGenSchema.findOne({ mockID: mockId });
    const newData = new FeedbackSchema({
      mockId,
      userQuestionAnswer: data,
      details: questionDoc.details,
      email
    });
    await newData.save();
    return "Successfully Saved";
  } catch (error) {
    return "Error while Saving Questions";
  }
};

// ----------- GENERATING GESTURE FEEDBACK ----------------

export const gestureFeedback = async (req, res) => {
  const { serverData } = req.body;

  const interviewData = serverData.interviewData;

  const expressionCount = {};
  let totalConfidence = 0;
  let eyeContactCount = { direct: 0, indirect: 0 };
  let postureIssues = { good: 0, tilted: 0, movement: 0 };
  let handMovements = { minor: 0, excessive: 0, none: 0 };
  let noFaceCount = 0;

  interviewData.forEach((entry) => {
    if (entry.noFace) {
      noFaceCount++;
      return;
    }

    expressionCount[entry.expression] =
      (expressionCount[entry.expression] || 0) + 1;
    totalConfidence += entry.confidence;

    if (entry.eyeContact === "Direct Eye Contact") eyeContactCount.direct++;
    else eyeContactCount.indirect++;

    if (entry.posture === "Good Posture") postureIssues.good++;
    else if (entry.posture === "Head Tilt Detected") postureIssues.tilted++;
    else if (entry.posture === "Excessive Body Movement")
      postureIssues.movement++;

    if (entry.handGesture === "Minor Hand Movement Detected")
      handMovements.minor++;
    else if (entry.handGesture === "Excessive Hand Movement Detected")
      handMovements.excessive++;
    else handMovements.none++;
  });

  const dominantExpression = Object.keys(expressionCount).reduce(
    (a, b) => (expressionCount[a] > expressionCount[b] ? a : b),
    Object.keys(expressionCount)[0] || "Neutral"
  );

  const averageConfidence =
    interviewData.length > noFaceCount
      ? (totalConfidence / (interviewData.length - noFaceCount)).toFixed(2)
      : "N/A";

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `
              Analyze the following interview performance data if interview data is not available then follow rule 1, and provide constructive feedback in simple English. Keep the feedback, clear, and understandable.
              
              Performance Data:
              - Dominant expression: ${dominantExpression}
              - Average confidence: ${averageConfidence}
              - Eye contact: Direct (${eyeContactCount.direct}), Indirect (${eyeContactCount.indirect})
              - Posture: Good (${postureIssues.good}), Tilted (${postureIssues.tilted}), Movement Issues (${postureIssues.movement})
              - No Face Detected Count: ${noFaceCount}
              
              Rules:
              1. If all the above counts are zero, indicate that it may mean the camera is not turned on.
              2. If the "No Face Detected Count" is high, state that the candidate may not be sitting properly, is not focusing, or there could be other issues.
              3. Evaluate the candidate's gestures and facial expressions based on the provided data. Comment on how genuine and natural they appear, and provide guidance if the gestures seem forced or inauthentic.
              4. Generate feedback based on the performance data, including specific guidance for improvement where necessary.
              5. Provide an overall feedback summary that covers the candidate's strengths, areas for improvement, suggestions, and a review of their gestures.
              6. Your output must be in JSON format exactly as follows:
              {,
                "areas_for_improvement": "<Your summary of the candidate's areas for improvement>",
                "suggestions": "<Your concise suggestions for improvement>",
              }
              7. Do not include any extra text, markdown formatting, bullet points, or commentary outside of this JSON structure.
              
              STRICTLY FOLLOW THE ABOVE INSTRUCTIONS.
              `,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(
      ` ${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    const feedbackText = response.data.candidates[0]?.content?.parts[0]?.text;
    const feedback = JSON.parse(feedbackText);
    res.status(200).json(feedback);
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(500).json({ error: "Invalid JSON response from Gemini API" });
    } else {
      res.status(500).json({ error: "Failed to get feedback from Gemini API" });
    }
  }
};

// ----------- PROMPT FOR GENERATING OVERALL FEEDBACK ----------------

const GeneratingFeedback = async (questionAnswer) => {
  const prompt = `
    Based on the following interview data and generate constructive feedback for each interview question, as well as overall feedback on the candidate's performance.

    If interview data is not provided clearly, indicate that the candidate did not answer the question then provide topics that the candidate should cover in future interviews **IN RUE 4 FORMAT ONLY**.

    Interview Data:
    Asked Questions with candidate answer: ${JSON.stringify(
      questionAnswer,
      null,
      2
    )}

    Rules:
    1. For each interview question and its corresponding candidate answer, generate detailed feedback. If the candidate's answer is unsatisfactory, provide specific guidance on how to improve.
    2. If the candidate's answer is empty, clearly indicate that the candidate did not answer the question and provide topics that the candidate should cover in future interviews.
    3. Provide an overall feedback summary that includes comprehensive guidance on the candidate's overall performance.
    4. Your output must be in JSON format exactly as follows:
    [
      {
        "question 1 feedback": "<Your detailed feedback on the answer, or indicate that the candidate did not answer if empty>"
      },
      {
        "question 2 feedback": "<Your detailed feedback on the answer, or indicate that the candidate did not answer if empty>"
      },...,
      {
        "overallFeedback": "<Your overall feedback on the candidate's performance>"
      }
    ]
    5. Do not include any extra text, markdown formatting, bullet points, or commentary outside of this JSON array.

    ❗ IMPORTANT: **DONT USE COMMA IN A QUESTION INSTEAD OF COMMA USE "or" ONLY**

    ❗ IMPORTANT: STRICTLY FOLLOW RULE 4.
    ❗ IMPORTANT: STRICTLY FOLLOW RULE 4.
    ❗ IMPORTANT: STRICTLY FOLLOW RULE 4.
    ❗ IMPORTANT: STRICTLY FOLLOW RULE 4.

    IN JSON FORMATE ONLY
    `;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response.data.candidates[0].content.parts[0].text);
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error(
      "Error generating questions:",
      error.response ? error.response.data : error.message
    );
    return "Error generating questions.";
  }
};

// ----------- GENERATING OVERALL FEEDBACK ----------------

export const OverallFeedback = async (req, res) => {
  const { mockId, email, userAnswer } = req.body;

  try {
    const feedback = await GeneratingFeedback(userAnswer);
    const data1 = await  SavingOverallFeedback(feedback, mockId, email)
    const data2 = await SavingQuestionAsnwer(userAnswer, mockId, email)

    return res.status(200).json({ message: "Successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try again later" });
  }
};

// ------------- SAVING GESTURE FEEDBACK ------------------

export const savingGestureFeedback = async (req, res) => {
  const { mockId, email, data } = req.body;

  const savedData = JSON.stringify(data);

  try {

    const newData = new FeedbackSchema({
      mockId,
      GestureFeedback: savedData,
    });
    await newData.save();
    return res.status(200).json({ message: "Successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Try again later" });
  }
};

// -------------- FETCHING CANDIDATE FEEDBACk -----------

export const fetchingFeedback = async (req, res) => {
  try {
    const { mockId } = req.query;

    if (!mockId) {
      return res.status(400).json({ message: "mockId is required" });
    }

    const feedbackData = await FeedbackSchema.find({ mockId });
    const feedbackDataType = await QuesGenSchema.findOne({ mockID:mockId });

    if (!feedbackData) {
      return res.status(404).json({ message: "No feedback found for the given mockId" });
    }

    return res.status(200).json({ feedbackData, feedbackDataType: feedbackDataType ? feedbackDataType.details : null });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong! Try again later" });
  }
};

// -------------- FETCHING CANDIDATE FEEDBACk LIST -----------

export const fetchingFeedbackList = async(req, res) => {

  const {email} = req.query

  try {
    const feedData = await FeedbackSchema.find({email})
    if(feedData == ""){
      return res.status(404).json({message:"No previous interview records found."})
    }

    return res.status(200).json(feedData)
  } catch (error) {
    return res.status(500).json({message:"Something went wrong! Try again later"})
  }
}

// ---------------- RATINGS FROM USER ---------------------

export const SavingRatings = async(req, res) => {
  const { mockID } = req.body

  try {
    const intData = await RatingSchema.findOne({mockID})
    if(intData){
      return  res.status(400).json({message:"Feedback Already Exist For this Interview"})
    }

    const newFeedback = new RatingSchema(req.body)
    await newFeedback.save()
    return res.status(200).json({message:"Feedback Submitted Succesfully"})
  } catch (error) {
    return res.status(500).json({message:"Error While Submitted Feedback"})
  }
}
