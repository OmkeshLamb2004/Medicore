import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
// import ChatHome from "./components/ChatHome";
import LoginSignUp from "./components/LoginSignUp";
import RequireAuth from "./components/RequireAuth";
import AdminDashboard from "./components/AdminDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import Home from "./components/Home";
import SignOut from "./components/SignOut";
import About from "./components/About";

function App() {
  return (
    <>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <div className="home-container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="admin" element={<RequireAuth role="admin" />}>
                <Route index element={<AdminDashboard />} />
              </Route>
              <Route path="doctor" element={<RequireAuth role="doctor" />}>
                <Route index element={<DoctorDashboard />} />
              </Route>
              <Route path="patient" element={<RequireAuth />}>
                <Route index element={<PatientDashboard />} />
              </Route>
              <Route path="signout" element={<RequireAuth />}>
                <Route index element={<SignOut />} />
              </Route>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="auth" element={<LoginSignUp />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </>
  );
}

export default App;
