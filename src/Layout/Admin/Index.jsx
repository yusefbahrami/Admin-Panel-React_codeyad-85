import React, { useEffect, useState } from "react";
import Navbar from "./navbar/index";
import Sidebar from "./sidebar/index";
import AdminContextContainer from "../../Context/AdminLayoutContext";
import Content from "../../Pages/Content";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Index = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("LoginToken"));
    if (loginToken) {
      axios
        .get("https://ecomadminapi.azhadev.ir/api/auth/user", {
          headers: { Authorization: `Bearer ${loginToken.token}` },
        })
        .then((res) => {
          console.log(res);
          setIsLogin(res.status == 200 ? true : false);
          setLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("LoginToken");
          setIsLogin(false);
          setLoading(false);
        });
    } else {
      setIsLogin(false);
      setLoading(false);
    }
  }, []);
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
        <Navigate to={"/login"} />
      )}
    </AdminContextContainer>
  );
};
export default Index;
