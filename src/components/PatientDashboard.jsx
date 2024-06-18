import React, { useState, useEffect } from "react";
import { database } from "./base";
import { useAuth } from "./context/auth/AuthState";
import { ref, onValue } from "firebase/database";
import ViewFiles from "./ViewFiles";

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [patientFiles, setPatientFiles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Fetch files for the current patient from Realtime Database
      const dbref = ref(database, `patient_data/${currentUser.phoneNumber}`);
      onValue(dbref, (snapshot) => {
        const files = snapshot.val() || [];
        setPatientFiles(files);
      });
    }
  }, [currentUser]);

  console.log({ patientFiles });

  return (
    <div className="dashboard-parent">
      <h2>Patient Dashboard</h2>
      <h3>Your Files:</h3>
      <ul>
        <ViewFiles rows={patientFiles} />
      </ul>
    </div>
  );
};

export default PatientDashboard;
