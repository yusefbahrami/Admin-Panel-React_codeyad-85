import React, { useContext } from "react";
import Category from "./Category/Category";
import Dashboard from "./Dashboard/Dashboard";
import AddCategory from "./Category/Components/AddCategory";
import { AdminContext } from "../Context/AdminLayoutContext";
import Product from "./Product/Product";

const Content = () => {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : ""}`}
    >
      {/* <Dashboard /> */}
      {/* <Category />
      <AddCategory /> */}
      <Product />
    </section>
  );
};
export default Content;
