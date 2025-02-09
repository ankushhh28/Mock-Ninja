import React from "react";
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import Filter7Icon from "@mui/icons-material/Filter7";

const InstructionsAI = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#f5f3ff",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ---------------------------Header-Fixed-------------------------- */}

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f3f5ff",
          padding: "20px",
          textAlign: "center",
          borderBottom: "2px solid #8667F2",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex:100,
        }}
      >
        <Typography variant="h4" sx={{ color: "#8667f2", fontWeight: "bold" }}>
          Instructions
        </Typography>
      </Box>
      {/* ----------------------------Instructions---------------------------- */}
      <Box
        sx={{
          width: "100%",
          flex: 1,
          overflowY: "auto",
          padding: "100px 20px 100px",
          padding: { xs: "90px 5px 70px", sm: "90px 10px 90px", md: "100px 20px 100px" },
          paddingRight: {xs:"3px", sm:"5px", md:"10px"},
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#f5f3ff",
          
        }}
      >
        <List sx={{ width:"100%", maxHeight: "calc(100vh - 200px)" }}>
          <ListItem>
            <ListItemIcon>
              <Filter1Icon sx={{ color: "#8667f2" }} />
            </ListItemIcon>
            <ListItemText primary="Ensure your camera remains on throughout the interview." primaryTypographyProps={{
   fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.3rem" }
  }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Filter2Icon sx={{ color: "#8667f2" }} />
            </ListItemIcon>
            <ListItemText primary="Choose a quiet environment with minimal distractions." primaryTypographyProps={{
    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.3rem" }
  }}/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Filter3Icon sx={{ color: "#8667f2" }} />
            </ListItemIcon>
            <ListItemText primary="Enable the answer button before speaking for each question." primaryTypographyProps={{
    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.3rem" }
  }}/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Filter4Icon sx={{ color: "#8667f2" }} />
            </ListItemIcon>
            <ListItemText primary="Maintain eye contact by looking at the camera." primaryTypographyProps={{
    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.3rem" }
  }}/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Filter5Icon sx={{ color: "#8667f2" }} />
            </ListItemIcon>
            <ListItemText primary="Check your internet, camera, and microphone before the interview." primaryTypographyProps={{
    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.3rem" }
  }}/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Filter6Icon sx={{ color: "#8667f2" }} />
            </ListItemIcon>
            <ListItemText primary="Speak clearly and structure your answers concisely." primaryTypographyProps={{
    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.3rem" }
  }}/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Filter7Icon sx={{ color: "#8667f2" }} />
            </ListItemIcon>
            <ListItemText primary="Avoid reading from a script; be natural and conversational." primaryTypographyProps={{
    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.3rem" }
  }}/>
          </ListItem>
        </List>
      </Box>
      <Box sx={{
          width: "100%",
          backgroundColor: "#f5f3ff",
          padding: "16px",
          borderTop: "2px solid #8667f2",
          position: "fixed",
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: { xs: "center", sm: "center", md: "flex-end" },
        }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8667F2",
            color: "#fff",
            width: "150px",
            position:"md:center",
            fontSize: { xs:"18px", sm:"23px"},
            marginRight: "20px",
            whiteSpace: "nowrap",
          }}
          >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default InstructionsAI;
