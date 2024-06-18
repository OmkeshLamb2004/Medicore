import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth/AuthState";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const RequireAuth = ({ role }) => {
  const { currentUser, currentUserRole } = useAuth();
  const location = useLocation();

  return currentUser === 0 || currentUserRole.dataUpdate === false ? (
    <div className="loading-symbol">
      <CircularProgress />
    </div>
  ) : !Boolean(currentUser) ? (
    <Navigate to="/auth" state={{ from: location }} replace />
  ) : (
    roleBasedOutput(role, currentUserRole)
  );
};

const roleBasedOutput = (role, currentUserRole) => {
  if (!role || currentUserRole[role] === true) {
    return <Outlet />;
  } else if (currentUserRole.admin === true) {
    return <Navigate to="/admin" />;
  } else if (currentUserRole.doctor === true) {
    return <Navigate to="/doctor" />;
  } else {
    return <Navigate to="/patient" />;
  }
};

export default RequireAuth;
