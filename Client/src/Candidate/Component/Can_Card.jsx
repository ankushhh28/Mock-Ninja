import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  TextField,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  Autocomplete,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import aiImg from "../../assets/images/CardAIImage.png";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../Context/DataProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CanDataContext } from "../../Context/CanDataProvider";
import { v4 as uuidv4 } from 'uuid';
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skillsss = [
  "HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "TypeScript", "SASS", "Bootstrap", "Tailwind CSS", "jQuery",
  "Node.js", "Express.js", "Django", "Flask", "Ruby on Rails", "PHP", "Laravel", "Spring Boot", "ASP.NET",
  "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase", "Redis",
  "Git", "GitHub", "GitLab", "Bitbucket",
  "Docker", "Kubernetes", "Jenkins", "CI/CD", "AWS", "Azure", "Google Cloud Platform",
  "REST", "WebSockets", "JSON", "XML",
  "HTTPS", "OAuth", "JWT", "SSL/TLS", "CORS",
  "Python", "R", "SQL", "SAS",
  "Pandas", "NumPy", "Excel", "Power Query",
  "Matplotlib", "Seaborn", "Tableau", "Power BI", "Plotly", "D3.js",
  "Hypothesis Testing", "ANOVA", "Regression Analysis", "Time Series Analysis",
  "Apache Spark", "Hadoop", "Kafka","C++",
  "Scikit-learn", "TensorFlow", "Keras", "XGBoost",
  "NoSQL",
  "Supervised Learning", "Unsupervised Learning", "Reinforcement Learning",
  "Neural Networks", "Convolutional Neural Networks", "Recurrent Neural Networks",
  "PyTorch",
  "Natural Language Processing", "NLTK", "spaCy", "BERT", "Transformers", "GPT",
  "Computer Vision", "OpenCV", "YOLO", "face-api.js", "Dlib",
  "Model Deployment", "FastAPI", "Streamlit", "AWS SageMaker",
  "Hugging Face", "AutoML", "MLflow", "Gemini API",
  "React Native", "Flutter", "Swift", "Kotlin", "Java", "Objective-C",
  "Xamarin", "Ionic", "Cordova",
  "GraphQL", "REST APIs",
  "Figma", "Sketch", "Adobe XD",
  "Wireframing", "Mockups", "Interactive Prototypes",
  "Media Queries", "Flexbox", "Grid Layout",
  "Design Thinking", "User Research", "Accessibility", "Typography", "Color Theory",
  "CSS Animations", "Lottie", "Framer Motion",
  "Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "GIMP", "Canva",
  "Font Design", "Kerning", "Tracking",
  "Color Schemes", "Gradient Design", "Contrast Balance",
  "Vector Art", "Digital Painting", "Character Design",
  "Logo Design", "Business Cards", "Posters", "Social Media Graphics",
  "DBMS", "Computer Networks", "System Design", "Operating Systems",
  "Object-Oriented Programming", "Data Structures", "Algorithms",
  "Software Development Life Cycle", "Agile Methodologies", "Microservices",
  "Load Balancing", "Caching", "API Gateway", "Networking Protocols",
  "Concurrency", "Multithreading", "Cloud Computing", "DevOps",
  "IT Security", "Authentication", "Authorization", "Encryption",
  "Problem-Solving Techniques", "Big-O Notation", "Design Patterns",
  "Version Control Systems", "Code Optimization", "Debugging Techniques"
];

const Can_Card = () => {

  gsap.registerPlugin(ScrollTrigger)

  const leftImage = useRef(null)
  const rightText = useRef(null)

  useGSAP(() => {
    gsap.from(leftImage.current,{
      x:-80,
      opacity:0,
      duration:1,
      scrollTrigger:leftImage.current
    })

    gsap.from(rightText.current,{
      x:170,
      opacity:0,
      duration:1,
      scrollTrigger:rightText.current
    })
  })

  const { backendUrl, account } = useContext(DataContext);
  const { setQuestionGenerated } = useContext(CanDataContext);

  // -------------------------------------------------------------------

  const navigate = useNavigate();

  const fileInputRef = useRef(null)

  // -------------------------------------------------------------------

  const [open, setOpen] = useState(false);
  const [intType, setIntType] = useState("Resume");
  const [intLevel, setIntLevel] = useState("Beginner");
  const [skill, setSkill] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("MERN Stack");
  const [file, setFile] = useState("");
  const [error, setError] = useState({ open: false, msg: "", severity: "" });
  const [loading, setLoading] = useState(false);

  const Domains = [
    {
      value: "MERN Stack",
      label: "MERN Stack",
    },
    {
      value: "Data Analyst",
      label: "Data Analyst",
    },
    {
      value: "App Development",
      label: "App Development",
    },
    {
      value: "BlockChain Development",
      label: "BlockChain Development",
    },
  ];

  // ------------------ SAVING DATA TO FUNCTION ---------------------------

  const savingQues = async(questions, details) => {
    const serverData = {
      candidateEmail:account.email,
      mockID:uuidv4(),
      questions:JSON.stringify(questions),
      details
    }
    // console.log("Questions:", serverData.questions)
    try {
      const response = await axios.post(`${backendUrl}/Can/Storing-Generate-Questions`, serverData)
      if(response.status === 200){
        navigate(`/Candidate/Interview/${response.data}`);
      }
    } catch (error) {
      setError({
        open: true,
        msg:
          error.response?.data?.message ||
          "Check your Connection! try again later",
        severity: "error",
      });
    }
  }

  // ------------------ HANDLE RESUME SUBMIT ---------------------------

  const handleResumeSubmit = async () => {
    setLoading(true);
    if (file === "") {
      setLoading(false);
      setError({
        open: true,
        msg: "Please upload your resume first",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        `${backendUrl}/Can/Resume-Generate-Questions`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const cleanedData = response.data.questions.split("\n")
        setQuestionGenerated(cleanedData);
        savingQues(response.data.questions)
    } catch (error) {
      console.log(error);
      setError({
        open: true,
        msg:
          error.response?.data?.message ||
          "Check your Connection! try again later",
        severity: "error",
      });
    } finally {
      setLoading(false);
      clearFile()
    }
  };

  // ----------------- HANDLE DOMAIN SUBMIT ----------------------------

  const handleDomainSubmit = async () => {
    setLoading(true);
    const serverData = {
      domain: selectedDomain,
      level: intLevel,
      role: account.role,
      accessToken: account.accessToken,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/Can/Domain-Skill-Generate-Questions`,
        serverData,
        {
          headers: {
            Authorization: `Bearer ${serverData.accessToken}`,
          },
        }
      );
      const cleanedData = response.data.replace(/```json|```/g, "");
      const parsedData = JSON.parse(cleanedData);
      setQuestionGenerated(parsedData);
      savingQues(parsedData, selectedDomain)
    } catch (error) {
      setError({
        open: true,
        msg:
          error.response?.data?.message ||
          "Check your Connection! try again later",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------- HANDLE SKILL SUBMIT -----------------------------

  const handleSkillSubmit = async () => {
    setLoading(true);
    const serverData = {
      domain: skill,
      level: intLevel,
      role: account.role,
      accessToken: account.accessToken,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/Can/Domain-Skill-Generate-Questions`,
        serverData,
        {
          headers: {
            Authorization: `Bearer ${serverData.accessToken}`,
          },
        }
      );
      const cleanedData = response.data.replace(/```json|```/g, "");
      const parsedData = JSON.parse(cleanedData);
      setQuestionGenerated(parsedData);
      savingQues(parsedData, skill)
    } catch (error) {
      setError({
        open: true,
        msg:
          error.response?.data?.message ||
          "Check your Connection! try again later",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------

  const clearFile = () => {
    setFile(null);                    
    fileInputRef.current.value = ""; 
  };

  // -------------------------------------------------------------------

  return (
    <>
      <Box className="flex flex-col sm:flex-row items-center gap-14 md:gap-6 bg-[#f5f3ff] px-8 pt-6 pb-12 md:pr-16  md:py-12">
        <Box 
        ref={leftImage}
        className="w-full md:w-1/2 flex justify-center">
          <img
            src={aiImg}
            alt="leftsideImage"
            className="w-full max-w-sm h-auto rounded-lg min-h-20 filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.3)] "
          />
        </Box>

        <Box 
        ref={rightText}
        className="flex flex-col w-full lg:w-1/2 gap-4  md:gap-8 text-center md:text-left ">
          <Typography className="text-3xl md:text-4xl text-primary font-extrabold mb-4 whitespace-nowrap text-wrap overflow-visible">
            Ace Your Next Interview with{" "}
            <span className="text-gray-700">AI!</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-800 text-justify text-xl"
          >
            Prepare for job interviews with real-time AI-driven mock interviews.
            Get instant feedback and improve your skills with our AI-powered
            system.
          </Typography>
          <Box className="text-left space-y-2 mb-6">
            <Typography
              variant="body1"
              className="text-gray-800 font-semibold text-xl"
            >
              🔹 Personalized questions based on your field
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-700 font-semibold  text-xl"
            >
              🔹 Real-time AI evaluation
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-700 font-semibold  text-xl"
            >
              🔹 Instant feedback & tips
            </Typography>
          </Box>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            className="normal-case text-white w-fit bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8] px-8 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
          >
            Start AI Interview
          </Button>
        </Box>
      </Box>

      {/* -------------------------- INTERVIEW FORM ----------------------- */}
      {/* -------------------------- INTERVIEW FORM ----------------------- */}
      {/* -------------------------- INTERVIEW FORM ----------------------- */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "white",
            borderRadius: 3,
            padding: 2,
            position: "relative",
            minWidth: { xs: 360, sm: 500 },
          },
        }}
      >
        {/* ----------------------- TOP RIGHT Close Button ---------------------- */}
        <DialogTitle
          sx={{ position: "absolute", top: 8, right: 8, padding: 0 }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              color: (theme) => theme.palette.grey[800],
              "&:hover": {
                backgroundColor: (theme) => theme.palette.grey[200],
              },
            }}
            className="text-3xl"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* ----------------------- TYPE OF INTERVIEW ------------------ */}

        <Box className="ml-4 mt-10">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Select Your Interview Type
          </Typography>

          <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
            <RadioGroup
              value={intType}
              onChange={(e) => setIntType(e.target.value)}
              name="interviewType"
              className="flex flex-row gap-2 sm:gap-10"
            >
              <FormControlLabel
                value="Resume"
                control={<Radio />}
                label="Resume"
              />
              <FormControlLabel
                value="Domain"
                control={<Radio />}
                label="Domain"
              />
              <FormControlLabel
                value="Skills"
                control={<Radio />}
                label="Skills"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* ----------------------  IF RESUME SELECTED ----------------- */}

        {intType === "Resume" && (
          <Box className="ml-4">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="w-[90%]"
              type="file"
              inputProps={{ accept: "application/pdf" }}
              helperText="Choose only PDF file"
              onChange={(e) => setFile(e.target.files[0])}
              inputRef={fileInputRef}
            />
          </Box>
        )}

        {/* ----------------------- IF DOMAIN SELECTED ----------------- */}

        {intType === "Domain" && (
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
            noValidate
            className="pr-4"
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Choose Domain"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                helperText="Please select your domain"
              >
                {Domains.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </Box>
        )}

        {/* ----------------------- IF SKILLS SELECTED ----------------- */}

        {intType === "Skills" && (
          <Box className="ml-4 mr-4">
          <Autocomplete
            multiple
            options={skillsss}
            value={skill}
            onChange={(event, value) => setSkill(value)}
            sx={{ width: "fullWidth" }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={option} label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => <TextField {...params} label="Select Skills" placeholder="Search Skills" />}
          />
          </Box>
        )}

        {/* -------------------- CHOOSE DIFFICULTY LEVEL -------------------------- */}

        {(intType === "Domain" || intType === "Skills") && (
          <Box className="ml-4 mt-6">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Choose difficulty level
            </Typography>

            <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
              <RadioGroup
                value={intLevel}
                onChange={(e) => setIntLevel(e.target.value)}
                name="difficultyLevel"
                className="flex sm:flex-row sm:gap-10"
              >
                <FormControlLabel
                  value="Beginner"
                  control={<Radio />}
                  label="Beginner"
                />
                <FormControlLabel
                  value="Intermediate"
                  control={<Radio />}
                  label="Intermediate"
                />
                <FormControlLabel
                  value="Hard"
                  control={<Radio />}
                  label="Hard"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        {/* ----------------------- RESUME SUBMIT BUTTON ----------------- */}

        {intType === "Resume" && (
          <DialogActions>
            {loading ? (
              <Box className="mx-auto">
                <CircularProgress />
              </Box>
            ) : (
              <Box className="mx-auto absoulte mt-5 sm:mt-6">
                <Button
                disabled={loading}
                  onClick={handleResumeSubmit}
                  variant="contained"
                  className="bg-blue-500 font-semibold hover:bg-blue-600 "
                >
                  Start interview
                </Button>{" "}
              </Box>
            )}
          </DialogActions>
        )}

        {/* ----------------------- DOMAIN SUBMIT BUTTON ----------------- */}

        {intType === "Domain" && (
          <DialogActions>
            <Box className="mx-auto absoulte mt-3 sm:mt-6">
              {loading ? (
                <Box className="mx-auto">
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                disabled={loading}
                  onClick={handleDomainSubmit}
                  variant="contained"
                  className="bg-blue-500 font-semibold hover:bg-blue-600 "
                >
                  Start interview
                </Button>
              )}
            </Box>
          </DialogActions>
        )}

        {/* ---------------------- SKILLS SUBMIT BUTTON ----------------- */}

        {intType === "Skills" && (
          <DialogActions>
            <Box className="mx-auto absoulte sm:mt-3 mt-6">
              {loading ? (
                <Box className="mx-auto">
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                disabled={loading}
                  onClick={handleSkillSubmit}
                  variant="contained"
                  className="bg-blue-500 font-semibold hover:bg-blue-600 "
                >
                  Start interview
                </Button>
              )}
            </Box>
          </DialogActions>
        )}
      </Dialog>

      {/* --------------------------------- SNACKBAR --------------------------- */}
      {/* --------------------------------- SNACKBAR --------------------------- */}
      {/* --------------------------------- SNACKBAR --------------------------- */}

      <Snackbar
        open={error.open}
        autoHideDuration={3000}
        onClose={() => setError({ ...error, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError({ ...error, open: false })}
          severity={error.severity}
          sx={{ width: "100%" }}
        >
          <b>{error.msg}</b>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Can_Card;
