import React, { useState, useEffect } from "react";
import "firebase/database";

import { database } from "./base";
import { useAuth } from "./context/auth/AuthState";

import { ref, onValue, get, child, push, update } from "firebase/database";
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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

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

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newNumber, setNewNumber] = useState({
    phone: "91",
    valid: false,
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { currentUser } = useAuth();

  useEffect(() => {
    // Fetch the list of doctors from Realtime Database
    const doctor_db_ref = ref(database, "doctor_list");
    onValue(doctor_db_ref, (snapshot) => {
      // Get the current value of the doctor_list array
      let doctorList = snapshot.val() || {};
      doctorList = Object.keys(doctorList);
      setDoctors(doctorList);
    });

    const admin_db_ref = ref(database, "admin_list");
    onValue(admin_db_ref, (snapshot) => {
      // Get the current value of the doctor_list array
      let adminList = snapshot.val() || {};
      adminList = Object.keys(adminList);
      setAdmins(adminList);
    });
  }, []);

  const addDoctor = () => {
    // Add a new doctor to Realtime Database
    if (!newNumber.valid) {
      alert("Please enter a valid phone number");
      return;
    }
    const updates = {};
    updates["/doctor_list/" + newNumber.phone] = true;
    update(ref(database), updates);
    setNewNumber({
      phone: "91",
      valid: false,
    });
  };

  const deleteDoctor = (phno) => {
    // Add a new doctor to Realtime Database
    // if (!newNumber.valid) {
    //   alert("Please enter a valid phone number");
    //   return;
    // }
    const updates = {};
    updates["/doctor_list/" + phno] = null;
    update(ref(database), updates);
  };

  const addAdmin = () => {
    // Add a new doctor to Realtime Database
    if (!newNumber.valid) {
      alert("Please enter a valid phone number");
      return;
    }
    const updates = {};
    updates["/admin_list/" + newNumber.phone] = true;
    update(ref(database), updates);
    setNewNumber({
      phone: "91",
      valid: false,
    });
  };

  const deleteAdmin = (phno) => {
    // Add a new doctor to Realtime Database
    // if (!newNumber.valid) {
    //   alert("Please enter a valid phone number");
    //   return;
    // }
    const updates = {};
    updates["/admin_list/" + phno] = null;
    update(ref(database), updates);
  };

  const handleChangePhno = (value) => {
    setNewNumber(value);
  };

  return (
    <div className="dashboard-parent">
      <h2>Admin Dashboard</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Add Doctor" {...a11yProps(0)} />
            <Tab label="Add Admin" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ul>
            {doctors.map((doctor, index) => (
              <li key={index}>
                {doctor}{" "}
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteDoctor(doctor)}
                >
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
          <PhoneNumber
            value={newNumber.phone}
            setValue={handleChangePhno}
            inputProps={{
              name: "phno",
              required: true,
            }}
          />
          <Button
            variant="contained"
            onClick={addDoctor}
            endIcon={<AddIcon />}
            style={{ marginTop: "10px" }}
          >
            Add Doctor
          </Button>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ul>
            {admins.map((admin, index) => (
              <li key={index}>
                {admin}{" "}
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteAdmin(admin)}
                >
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
          <PhoneNumber
            value={newNumber.phone}
            setValue={handleChangePhno}
            inputProps={{
              name: "phno",
              required: true,
            }}
          />
          <Button
            variant="contained"
            onClick={addAdmin}
            endIcon={<AddIcon />}
            style={{ marginTop: "10px" }}
          >
            Add Admin
          </Button>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default AdminDashboard;
