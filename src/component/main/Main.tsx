import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "../auth/Signup";
import Forgetpassword from "../auth/Forgetpassword";
import Newpassword from "../auth/Newpassword";

const Main:React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgetpassword" element={<Forgetpassword />} />
          <Route path="/Newpassword" element={<Newpassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
