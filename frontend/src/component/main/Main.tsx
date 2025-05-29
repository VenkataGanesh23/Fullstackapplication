import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "../auth/Signup";
import Forgetpassword from "../auth/Forgetpassword";
import Newpassword from "../auth/Newpassword";
import Dashboard from "../auth/Dashboard";
import { ProtectedRoute } from "../routing/Protectedroutes";
import { useAuth } from "../../context/AuthContext";

const Main: React.FC = () => {
  const {user}=useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user?<Login />:<Navigate to="/dashboard"/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Forgetpassword" element={<Forgetpassword />} />
        <Route path="/Newpassword" element={<Newpassword />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
