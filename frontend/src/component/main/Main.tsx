import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "../auth/Signup";
import Forgetpassword from "../auth/Forgetpassword";
import Newpassword from "../auth/Newpassword";
import Dashboard from "../auth/Dashboard";
import { ProtectedRoute } from "../routing/Protectedroutes";
import { useAuth } from "../../context/AuthContext";
import Shoes from "../reusable/Shoes";
import ProductDetails from "../reusable/Products/ProductDetails";

const Main: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/newpassword/:token" element={<Newpassword />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />
        <Route path="/shoes" element={<Shoes />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} />  */}
        <Route path="/Productdetails" element={<ProductDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
