import React from "react";
import Navbar from "./navbar/index";
import Sidebar from "./sidebar/index";
import AdminContextContainer from "../../Context/AdminLayoutContext";
import Content from "../../Pages/Content";
const Index = () => {
  return (
    <AdminContextContainer>
      <div>
        <Content />
        <Navbar />
        <Sidebar />
      </div>
    </AdminContextContainer>
  );
};
export default Index;
