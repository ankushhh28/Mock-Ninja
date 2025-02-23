import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import  { DataContext } from "../../Context/DataProvider"
import  { ExpDataContext } from "../../Context/ExpDataProvider"
import axios from "axios";

const AddPackage = () => {

  //* ---------------------------------- PACKAGES ARRAY ----------------------------------

  const packages = [
    "Interview",
    "Career Guidance",
    "Resume Guidance",
    "Priority DM",
  ];

  // ---------------------- BACKEND URL ------------------------

  const { backendUrl, account } = useContext(DataContext)
  const { setFetchedData, fetchedData } = useContext(ExpDataContext)

  //* ----------------------------------- USE STATES -------------------------------------

  const [addModal, setAddModal] = useState({
    open:false,
    packageName:""
  })
  const [delModal, setDelModal] = useState({
    open:false,
    packageName:""
  })
  const [modalMsg, setModalMsg] = useState({
    open: false,
    msg: "",
    severity: "",
  });
  const [addLoad, setAddLoad] = useState(false)
  const [delLoad, setDelLoad] = useState(false)

  // ---------------- ADDING PACKAGE FUNCTION ----------------------------

  const handleAddPackage = async() => {

    setAddLoad(true)
    const serverData = {
      email:account.email,
      role:account.role,
      packageName:addModal.packageName
    }

    try {
      const response = await axios.put(`${backendUrl}/Exp/Adding-Package`, serverData , {
        headers:{
          Authorization:`Bearer ${account.accessToken}`
        }
      })
      if(response.status === 200){
        setModalMsg({open:true, msg:response?.data?.message || "Check Your Conntection! Try Later.", severity:"success"});
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
    } finally {
      setAddLoad(false)
      setAddModal({open:false, packageName:""})
    }
  }

  // ---------------- ADDING PACKAGE FUNCTION ----------------------------

  const handleDelPackage = async() => {
    setDelLoad(true)
    const serverData = {
      email:account.email,
      role:account.role,
      packageName:delModal.packageName
    }

    try {
      const response = await axios.put(`${backendUrl}/Exp/Deleting-Package`, serverData , {
        headers:{
          Authorization:`Bearer ${account.accessToken}`
        }
      })
      if(response.status === 200){
        setModalMsg({open:true, msg:response?.data?.message || "Check Your Conntection! Try Later.", severity:"success"});
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
    } finally {
      setDelLoad(false)
      setDelModal({open:false, packageName:""})
    }
  }

  // ----------------- FETCHING PACKAGE DATA ------------------------

  useEffect(() => {
    const fetchPackages = async() => {
      try {
        const response = await axios.get(`${backendUrl}/Exp/Fetching-Package`, {
          params:{email:account.email, role:account.role},
          headers: {
            Authorization:`bearer ${account.accessToken}`
          }
        })
        if(response.status === 200){
          setFetchedData({
            CarrierPackage:response.data.CarrierPackage,
            InterviewPackage:response.data.InterviewPackage,
            PriorityPackage:response.data.PriorityPackage,
            ResumePackage:response.data.ResumePackage
          })
        }
      } catch (error) {
        setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
      }
    }
    fetchPackages()
  },[addLoad, backendUrl, delLoad])

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
          {packages.map((item, index) => {

          const packageKeyMap = {
            "Interview": "InterviewPackage",
            "Resume Guidance": "ResumePackage",
            "Career Guidance": "CarrierPackage",
            "Priority DM": "PriorityPackage"
          };

        const packageKey = packageKeyMap[item]; // Map package name to schema key
        const isActive = fetchedData[packageKey] === true; // Check if package is active

        return (
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
                onClick={() => setAddModal({ open: true, packageName: item })}
                disabled={isActive} // Disable if active
                className={`normal-case px-4 sm:px-6 py-1 text-sm sm:text-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                  isActive ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Add
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                onClick={() => setDelModal({ open: true, packageName: item })}
                disabled={!isActive} // Disable if inactive
                className={`normal-case px-3 sm:px-4 py-1 text-sm sm:text-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                  !isActive ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Remove
              </Button>
            </TableCell>
            <TableCell
              align="center"
              className="text-sm sm:text-lg font-semibold"
            >
              <span
                className={`px-2 sm:px-3 py-2 flex items-center justify-center font-bold rounded-full text-xs sm:text-sm ${
                  isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                <span className="animate-pulse">
                  <span className="inline mb-2">o </span>
                  {isActive ? "Active" : "Not Active"}
                </span>
              </span>
            </TableCell>
          </TableRow>
        );
      })}


          </TableBody>
        </Table>
      </TableContainer>

{/* ----------------- ADD CONFIRM MODAL -------------------------- */}

<Dialog open={addModal.open} onClose={() => setAddModal({open:false, packageName:""})}>
<DialogContent className="mt-2">
  <p className="text-lg sm:text-xl">
    Are you sure to want to Activate <span className="font-bold">{addModal.packageName} package</span>?
  </p>
</DialogContent>

<DialogActions>
  <Button
  onClick={() => setAddModal({open:false, packageName:""})}>
    Cancel
  </Button>
{addLoad ? (
  <CircularProgress size={20} className="mr-8 text-black"/>
) : (
  <Button 
  onClick={() => handleAddPackage()}
  className="text-red-600">
    Confirm
  </Button>
)}
</DialogActions>
</Dialog>

{/* ----------------- DELETE CONFIRM MODAL -------------------------- */}

<Dialog open={delModal.open} onClose={() => setDelModal({open:false, packageName:""})}>
<DialogContent className="mt-2">
  <p className="text-lg sm:text-xl">
    Are you sure to want to Deactivate <span className="font-bold">{delModal.packageName} package</span>?
  </p>
</DialogContent>

<DialogActions>
  <Button
  onClick={() => setDelModal({open:false, packageName:""})}>
    Cancel
  </Button>
{delLoad ? (
  <CircularProgress size={20} className="mr-8 text-black"/>
) : (
  <Button 
  onClick={() => handleDelPackage()}
  className="text-red-600">
    Confirm
  </Button>
)}
</DialogActions>
</Dialog>

{/* -------------------- SANCK BAR --------------------- */}

<Snackbar
  open={modalMsg.open}
  className="mt-4"
  autoHideDuration={3000}
  onClose={() => setModalMsg({ ...modalMsg, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setModalMsg({ ...modalMsg, open: false })}
    severity={modalMsg.severity}
    sx={{ width: "100%" }}
  >
    <b>{modalMsg.msg}</b>
  </Alert>
</Snackbar>

    </Box>
  );
};

export default AddPackage;
