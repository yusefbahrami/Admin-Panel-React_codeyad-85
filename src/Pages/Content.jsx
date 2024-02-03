import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "../Context/AdminLayoutContext";
import { useSelector } from "react-redux";
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
import ProductGallery from "./Product/Components/gallery/ProductGallery";
import AddDiscount from "./Discounts/Components/addDiscount";
import AddRole from "./Roles/Components/addRole";
import AddUser from "./Users/Components/addUser";
import { useHasPermission } from "../Hooks/permissionsHook";
import PermissionsComponent from "../Components/PermissionsComponent";
import AddDelivery from "./Deliveries/Components/addDelivery";
import AddCart from "./Carts/Components/addCart";
import AddOrder from "./Orders/Components/addOrder";

const Content = () => {
  const { showSidebar } = useContext(AdminContext);

  const user = useSelector((state) => state.userReducer.data);
  const roles = user.roles;
  let permissions = [];
  for (const role of roles) {
    permissions = [...permissions, role];
  }
  // console.log(permissions);
  // console.log(roles);
  // const hasPermission = (permission) => {
  //   return permissions.findIndex((p) => p.title.includes(permission)) > -1;
  // };
  const hasCategoryPermission = useHasPermission("read_categories");
  const hasDiscountPermission = useHasPermission("read_discounts");
  const hasUserPermission = useHasPermission("read_users");
  const hasRolePermission = useHasPermission("read_roles");
  const hasDeliveyPermission = useHasPermission("read_deliveries");
  const hasCartPermission = useHasPermission("read_carts");
  const hasOrderPermission = useHasPermission("read_orders");

  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : ""}`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {hasCategoryPermission && (
          <Route path="/categories" element={<Category />}>
            <Route path=":categoryId" element={<CategoryChildren />} />
          </Route>
        )}
        <Route
          path="/categories/:categoryId/attributes"
          element={
            <PermissionsComponent
              component={<Attributes />}
              pTitle="read_category_attrs"
            />
          }
        />
        <Route
          path="/products"
          element={
            <PermissionsComponent
              component={<Product />}
              pTitle="read_products"
            />
          }
        />
        <Route
          path="/products/add-product"
          element={
            <PermissionsComponent
              component={<AddProduct />}
              pTitle="create_product"
            />
          }
        />
        <Route
          path="/products/set-attr"
          element={
            <PermissionsComponent
              component={<SetAttribute />}
              pTitle="create_product_attr"
            />
          }
        />
        <Route
          path="/products/gallery"
          element={
            <PermissionsComponent
              component={<ProductGallery />}
              pTitle="create_product_image"
            />
          }
        />
        <Route
          path="/colors"
          element={
            <PermissionsComponent component={<Colors />} pTitle="read_colors" />
          }
        />
        <Route
          path="/guranties"
          element={
            <PermissionsComponent
              component={<Guranties />}
              pTitle="read_guaranties"
            />
          }
        />
        <Route
          path="/brands"
          element={
            <PermissionsComponent component={<Brands />} pTitle="read_brands" />
          }
        />

        {hasDiscountPermission && (
          <Route path="/discounts" element={<Discounts />}>
            <Route
              path="add-discount-code"
              element={
                <PermissionsComponent
                  component={<AddDiscount />}
                  pTitle="create_discount"
                />
              }
            />
          </Route>
        )}

        {hasCartPermission && (
          <Route path="/carts" element={<Carts />}>
            <Route
              path="add-cart"
              element={
                <PermissionsComponent
                  component={<AddCart />}
                  pTitle="create_cart"
                />
              }
            />
          </Route>
        )}

        {hasOrderPermission && (
          <Route path="/orders" element={<Orders />}>
            <Route
              path="add-order"
              element={
                <PermissionsComponent
                  component={<AddOrder />}
                  pTitle="create_order"
                />
              }
            />
          </Route>
        )}

        {hasDeliveyPermission && (
          <Route path="/deliveries" element={<Deliveries />}>
            <Route
              path="add-delivery"
              element={
                <PermissionsComponent
                  component={<AddDelivery />}
                  permissionTitle={"create_delivery"}
                />
              }
            />
          </Route>
        )}

        {hasUserPermission && (
          <Route path="/users" element={<Users />}>
            <Route
              path="add-user"
              element={
                <PermissionsComponent
                  component={<AddUser />}
                  pTitle="create_user"
                />
              }
            />
          </Route>
        )}

        {hasRolePermission && (
          <Route path="/roles" element={<Roles />}>
            <Route
              path="add-role"
              element={
                <PermissionsComponent
                  component={<AddRole />}
                  pTitle="create_role"
                />
              }
            />
          </Route>
        )}

        <Route
          path="/permissions"
          element={
            <PermissionsComponent
              component={<Permissions />}
              pTitle="read_permissions"
            />
          }
        />
        <Route path="/questions" element={<Questions />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </section>
  );
};
export default Content;
