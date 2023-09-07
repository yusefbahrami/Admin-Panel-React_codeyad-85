import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../Pages/Auth/Login";

const AuthLayout = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/auth/login" element={<Login />} /> */}
        </Routes>
      </div>
    </div>
  );
};
export default AuthLayout;
