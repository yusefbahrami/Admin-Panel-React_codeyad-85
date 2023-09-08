import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../Pages/Auth/Login";
import { useIsLogin } from "../../Hooks/authHook";

const AuthLayout = () => {
  const [loading, isLogin] = useIsLogin();
  return (
    <div className="limiter">
      {loading ? (
        <h2 className="text-center">لطفا صبر کنید</h2>
      ) : !isLogin ? (
        <div className="container-login100">
          <Routes>
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
};
export default AuthLayout;
