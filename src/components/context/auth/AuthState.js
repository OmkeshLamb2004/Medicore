// import React from "react";
import React, { useContext, createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { auth, database } from "../../base";
import { ref, onValue, get, child } from "firebase/database";

const AuthState = (props) => {
  const [currentUser, setcurrentUser] = useState(0);
  const [currentUserRole, setcurrentUserRole] = useState({
    doctor: false,
    admin: false,
    dataUpdate: false,
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const dbref = ref(database);
      get(child(dbref, "doctor_list"))
        .then((snapshot) => {
          // Get the current value of the doctor_list array
          let doctorList = snapshot.val() || {};
          doctorList = Object.keys(doctorList);
          console.log(doctorList);
          // Check if the patientName is present in the  doctor_list array
          if (
            doctorList &&
            Array.isArray(doctorList) &&
            doctorList.includes(currentUser.phoneNumber)
          ) {
            setcurrentUserRole((prev) => {
              return { ...prev, doctor: true, dataUpdate: true };
            });
          } else {
            setcurrentUserRole((prev) => {
              return { ...prev, doctor: false, dataUpdate: true };
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });

      get(child(dbref, "admin_list"))
        .then((snapshot) => {
          let adminList = snapshot.val() || {};
          adminList = Object.keys(adminList);
          if (
            adminList &&
            Array.isArray(adminList) &&
            adminList.includes(currentUser.phoneNumber)
          ) {
            setcurrentUserRole((prev) => {
              return { ...prev, admin: true, dataUpdate: true };
            });
          } else {
            setcurrentUserRole((prev) => {
              return { ...prev, admin: false, dataUpdate: true };
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setcurrentUserRole({
        doctor: false,
        admin: false,
        dataUpdate: false,
      });
    }
  }, [currentUser]);

  console.log({ currentUser });

  const value = { currentUser, currentUserRole };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthState;
