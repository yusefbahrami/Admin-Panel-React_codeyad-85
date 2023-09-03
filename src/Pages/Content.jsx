import React, { useContext } from "react";
import Category from "./Category/Category";
import Dashboard from "./Dashboard/Dashboard";
import { AdminContext } from "../Context/AdminLayoutContext";
import Product from "./Product/Product";
import { Route, Routes } from "react-router-dom";
import Colors from "./Colors/Colors";
import Guranties from "./Guranties/Guranties";
import Brands from "./Brands/Brands";

const Content = () => {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : ""}`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/products" element={<Product />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/guranties" element={<Guranties />} />
        <Route path="/brands" element={<Brands />} />

        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </section>
  );
};
export default Content;
