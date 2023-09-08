import React, { useEffect, useState } from "react";
import Navbar from "./navbar/index";
import Sidebar from "./sidebar/index";
import AdminContextContainer from "../../Context/AdminLayoutContext";
import Content from "../../Pages/Content";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useIsLogin } from "../../Hooks/authHook";

const Index = () => {
  const [loading, isLogin] = useIsLogin();
  return (
    <AdminContextContainer>
      {loading ? (
        <h2 className="text-center">لطفا صبر کنید</h2>
      ) : isLogin ? (
        <div>
          <Content />
          <Navbar />
          <Sidebar />
        </div>
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </AdminContextContainer>
  );
};
export default Index;
