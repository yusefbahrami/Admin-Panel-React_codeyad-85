import React, { useEffect } from "react";
import Navbar from "./navbar/index";
import Sidebar from "./sidebar/index";
import { useSelector, useDispatch } from "react-redux";
import AdminContextContainer from "../../Context/AdminLayoutContext";
import Content from "../../Pages/Content";
import { Navigate } from "react-router-dom";
import { useIsLogin } from "../../Hooks/authHook";
import { getRolesActionRedux } from "../../Redux/user/userActions";

const Index = () => {
  const [loading, isLogin] = useIsLogin();

  // const { data, error } = useSelector((state) => state.userReducer);
  // console.log(roles);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getRolesActionRedux());
  //   console.log(roles);
  // }, []);

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
