import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useState } from "react";

const AddPackage = () => {

  //* ---------------------------------- PACKAGES ARRAY ----------------------------------
  const packages = [
    "Interview",
    "Career Guidance",
    "Resume Guidance",
    "Priority DM",
  ];

  //* ----------------------------------- USE STATES -------------------------------------
  const [status, setStatus] = useState({});


  //* ----------------------------------- PACKAGE ACTIVE ---------------------------------
  const handleActivate = (index) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [index]: true,
    }));
  };

  //* ---------------------------------- PACKAGE DEACTIVATE ------------------------------- 
  const handleDeactivate = (index) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [index]: false,
    }));
  };

  return (
    <Box className="w-full h-full flex justify-center items-center mt-16  bg-gradient-to-r from-purple-50 to-blue-50 ">
      <TableContainer className="shadow-xl rounded-2xl overflow-hidden w-full overflow-x-auto">
        <Table className="min-w-[600px] sm:min-w-full">
          <TableHead>
            <TableRow className="bg-gradient-to-r from-purple-600 via-primary to-blue-500">
              <TableCell
                align="center"
                className="font-bold text-sm sm:text-lg text-white border-r border-white/20"
              >
                S.no.
              </TableCell>
              <TableCell className="font-bold text-sm sm:text-lg text-white border-r border-white/20">
                Package Name
              </TableCell>
              <TableCell
                align="center"
                className="font-bold text-sm sm:text-lg text-white border-r border-white/20"
              >
                Activate
              </TableCell>
              <TableCell
                align="center"
                className="font-bold text-sm sm:text-lg text-white border-r border-white/20"
              >
                Deactivate
              </TableCell>
              <TableCell
                align="center"
                className="font-bold text-sm sm:text-lg text-white"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((item, index) => (
              <TableRow
                key={index}
                className="bg-white/80 hover:bg-purple-50 transition-all duration-300 border-b border-purple-400/80"
              >
                <TableCell
                  align="center"
                  className="text-sm sm:text-lg font-medium text-gray-700"
                >
                  {index + 1}.
                </TableCell>
                <TableCell className="text-sm sm:text-lg font-medium text-gray-700">
                  {item}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleActivate(index)}
                    className="bg-blue-500 hover:bg-blue-600 normal-case px-4 sm:px-6 py-1 text-sm sm:text-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Add
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleDeactivate(index)}
                    className="bg-red-500 hover:bg-red-600 normal-case px-3 sm:px-4 py-1 text-sm sm:text-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Remove
                  </Button>
                </TableCell>
                <TableCell
                  align="center"
                  className="text-sm sm:text-lg font-semibold"
                >
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      status[index]
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status[index] ? "Active" : "Not Active"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddPackage;
