import React, { useState, useEffect } from "react";
import { database, storage } from "./base";
import { useAuth } from "./context/auth/AuthState";
import { ref, push, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  ref as dbRef,
  onValue,
  update,
  get,
  serverTimestamp,
} from "firebase/database";
import uuid from "react-uuid";
import "./css/DoctorDashboard.css";
import TextField from "@mui/material/TextField";
import PhoneNumber from "./PhoneNumber";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import ViewFiles from "./ViewFiles";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [patientNumber, setPatientNumber] = useState({
    phone: "91",
    valid: false,
  });
  const [patients, setPatients] = useState([]);
  const [value, setValue] = React.useState(0);
  const [patientFiles, setPatientFiles] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch the list of patients from Realtime Database
    const dbref = dbRef(database, "patient_data");
    onValue(dbref, (snapshot) => {
      const patientList = snapshot.val() || [];
      console.log({ patientList });
      setPatients(patientList);
    });
  }, []);

  const uploadFile = async () => {
    if (!file || !fileName || !patientNumber.valid) {
      alert("Please fill in all the fields correctly.");
      return;
    }

    try {
      // Upload file to Storage
      const extension = file.name.split(".").pop();
      const storageRef = ref(
        storage,
        `${patientNumber.phone}-${uuid()}.${extension}`
      );
      await uploadBytes(storageRef, file);

      // Get the download URL
      const fileUrl = await getDownloadURL(storageRef);

      console.log("File available at", fileUrl);

      // Store file metadata in Realtime Database
      const updates = {};
      const existingFiles = patients[patientNumber.phone] || [];
      // existingFiles.push({ fileName, fileUrl });
      console.log({ existingFiles });
      updates[`/patient_data/${patientNumber.phone}/${existingFiles.length}`] =
        {
          fileName,
          fileUrl,
          timestamp: serverTimestamp(),
        };
      console.log({ updates });
      update(dbRef(database), updates);

      setFile(null);
      setFileName("");
      setPatientNumber({
        phone: "91",
        valid: false,
      });
    } catch (error) {
      console.trace("File upload failed", error);
      alert("File upload failed. Please try again.");
    }
  };

  const viewFiles = () => {
    if (!patientNumber.valid) {
      alert("Please enter a valid patient phone number.");
      return;
    }

    // Fetch files for the given patient from Realtime Database
    const patientFiles = patients[patientNumber.phone] || [];

    setPatientFiles(patientFiles);

    // Display file URLs or handle as needed
    console.log(`Files for patient ${patientNumber.phone}:`, patientFiles);
  };

  const handleChangePhno = (value) => {
    setPatientNumber(value);
  };

  return (
    <div className="dashboard-parent">
      <h2>Doctor Dashboard</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Upload Files" {...a11yProps(0)} />
            <Tab label="View Files" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <label>
            Patient's Phone Number:
            <div className="dashboard-phno">
              <PhoneNumber
                value={patientNumber.phone}
                setValue={handleChangePhno}
                inputProps={{
                  name: "phno",
                  required: true,
                }}
              />
            </div>
          </label>
          <br />
          <label>
            File:
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <br />
          <TextField
            id="standard-basic"
            label="File Name"
            variant="outlined"
            placeholder="Enter File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            style={{ marginTop: "10px" }}
          />
          <br />
          <Button
            variant="contained"
            onClick={uploadFile}
            endIcon={<FileUploadIcon />}
            style={{ marginTop: "10px" }}
          >
            Upload File
          </Button>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <label>
            Patient's Phone Number:
            <div className="dashboard-phno">
              <PhoneNumber
                value={patientNumber.phone}
                setValue={handleChangePhno}
                inputProps={{
                  name: "phno",
                  required: true,
                  id: "dashboard-phno",
                }}
              />
            </div>
          </label>
          <br />
          <Button variant="contained" onClick={viewFiles}>
            View Files
          </Button>
          <h3>Files:</h3>
          <ul>
            <ViewFiles rows={patientFiles} />
          </ul>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default DoctorDashboard;
