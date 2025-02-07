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
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import aiImg from "../../assets/images/CardAIImage.png";
import CloseIcon from "@mui/icons-material/Close";

const Can_Card = () => {
  const [open, setOpen] = useState(false);
  const [intType, setIntType] = useState("Resume");
  const [intLevel, setIntLevel] = useState("Beginner");

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

  return (
    <>
      <Box className="flex flex-col sm:flex-row items-center gap-14 md:gap-6 bg-[#f5f3ff] px-8 pt-6 pb-12 md:pr-16  md:py-12">
        <Box className="w-full md:w-1/2 flex justify-center">
          <img
            src={aiImg}
            alt="leftsideImage"
            className="w-full max-w-sm h-auto rounded-lg min-h-20 filter drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] "
          />
        </Box>

        <Box className="flex flex-col w-full lg:w-1/2 gap-4  md:gap-8 text-center md:text-left ">
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
            minWidth: { xs: 350, sm: 500 },
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

        {/* ------------------------ IF RESUME SELECTED ----------------- */}

        {intType === "Resume" && (
          <Box className="ml-4">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="w-[90%]"
              type="file"
            />
          </Box>
        )}

        {/* ------------------------ IF DOMAIN SELECTED ----------------- */}

        {intType === "Domain" && (
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "90%" } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Choose Domain"
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

        {/* ------------------------ IF SKILLS SELECTED ----------------- */}

        {intType === "Skills" && (
          <Box className="ml-4">
            <TextField
              id="outlined-basic"
              label="Enter Skills"
              placeholder="e.g. Javascript, Python, Java etc"
              variant="outlined"
              className="w-[90%]"
            />
          </Box>
        )}

        {/* ---------------------CHOOSE DIFFICULTY LEVEL -------------------------- */}
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
            <Box className="mx-auto absoulte mt-5 sm:mt-6">
              <Button
                variant="contained"
                className="bg-blue-500 font-semibold hover:bg-blue-600 "
              >
                Start interview
              </Button>{" "}
            </Box>
          </DialogActions>
        )}

        {/* ----------------------- DOMAIN SUBMIT BUTTON ----------------- */}

        {intType === "Domain" && (
          <DialogActions>
            <Box className="mx-auto absoulte mt-3 sm:mt-6">
              <Button
                variant="contained"
                className="bg-blue-500 font-semibold hover:bg-blue-600 "
              >
                Start interview
              </Button>{" "}
            </Box>
          </DialogActions>
        )}

        {/* ---------------------- SKILLS SUBMIT BUTTON ----------------- */}

        {intType === "Skills" && (
          <DialogActions>
            <Box className="mx-auto absoulte sm:mt-3 mt-6">
              <Button
                variant="contained"
                className="bg-blue-500 font-semibold hover:bg-blue-600 "
              >
                Start interview
              </Button>{" "}
            </Box>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Can_Card;
