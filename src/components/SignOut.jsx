import React, { useEffect } from "react";
import { useAuth } from "./context/auth/AuthState";
import { signOut } from "firebase/auth";
import { auth } from "./base";
import CircularProgress from "@mui/material/CircularProgress";

const SignOut = () => {
  const { currentUser } = useAuth();
  function handlesignout() {
    console.log("nothing");
    if (currentUser) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }
  useEffect(() => {
    handlesignout();
  }, []);

  return (
    <div>
      Signing Out
      <CircularProgress />
    </div>
  );
};

export default SignOut;
