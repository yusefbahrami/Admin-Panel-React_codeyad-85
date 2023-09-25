import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "../Context/AdminLayoutContext";
import Category from "./Category/Category";
import Dashboard from "./Dashboard/Dashboard";
import Product from "./Product/Product";
import Colors from "./Colors/Colors";
import Guranties from "./Guranties/Guranties";
import Brands from "./Brands/Brands";
import Discounts from "./Discounts/Discounts";
import Carts from "./Carts/Carts";
import Orders from "./Orders/Orders";
import Deliveries from "./Deliveries/Deliveries";
import Users from "./Users/Users";
import Roles from "./Roles/Roles";
import Permissions from "./Permissions/Permissions";
import Comments from "./Comments/Comments";
import Questions from "./Questions/Questions";
import Logout from "./Auth/Logout";
import CategoryChildren from "./Category/Components/CategoryChildren";
import Attributes from "./Category/Components/attrs/Attributes";
import AddProduct from "./Product/Components/Addproduct";
import SetAttribute from "./Product/Components/setAttr/SetAttribute";

const Content = () => {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : ""}`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Category />}>
          <Route path=":categoryId" element={<CategoryChildren />} />
        </Route>
        <Route
          path="/categories/:categoryId/attributes"
          element={<Attributes />}
        />
        <Route path="/products" element={<Product />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/products/set-attr" element={<SetAttribute />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/guranties" element={<Guranties />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </section>
  );
};
export default Content;
