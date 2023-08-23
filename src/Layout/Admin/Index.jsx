import React, { useContext, useEffect } from "react";
import Navbar from "./navbar/index";
import Sidebar from "./sidebar/index";
import { toggleSidebar } from "../../Utils/initialDoms";
import AdminContextContainer, {
  AdminContext,
} from "../../Context/AdminLayoutContext";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Category from "../../Pages/Category/Category";
import AddCategory from "../../Pages/Category/Components/AddCategory";
const Index = () => {
  // useEffect(() => {
  //   // require("../../assets/js/toogleSidebar");
  //   // toggleSidebar();
  // }, []);
  const { showSidebar } = useContext(AdminContext);
  return (
    <AdminContextContainer>
      <div>
        <Navbar />
        <Sidebar />

        <section
          id="content_section"
          className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : ""}`}
        >
          {/* <Dashboard /> */}
          <Category />
          <AddCategory />
        </section>
      </div>
    </AdminContextContainer>
  );
};
export default Index;
