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

const Content = () => {
  const { showSidebar } = useContext(AdminContext);

  // const user = useSelector((state) => state.userReducer.data);
  // const roles = user.roles;
  // let permissions = [];
  // for (const role of roles) {
  //   permissions = [...permissions, role];
  // }
  // // console.log(permissions);
  // const hasPermission = (permission) => {
  //   return permissions.findIndex((p) => p.title.includes(permission)) > -1;
  // };
  const hasCategoryPermission = useHasPermission("read_categories");
  const hasDiscountPermission = useHasPermission("read_discounts");
  const hasUserPermission = useHasPermission("read_users");
  const hasRolePermission = useHasPermission("read_roles");

  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : ""}`}
    >
      {/* <Routes>
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
        <Route path="/products/gallery" element={<ProductGallery />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/guranties" element={<Guranties />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/discounts" element={<Discounts />}>
          <Route path="add-discount-code" element={<AddDiscount />} />
        </Route>
        <Route path="/orders" element={<Orders />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/users" element={<Users />}>
          <Route path="add-user" element={<AddUser />} />
        </Route>
        <Route path="/roles" element={<Roles />}>
          <Route path="add-role" element={<AddRole />} />
        </Route>
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/*" element={<Dashboard />} />
      </Routes> */}
      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        {hasPermission("read_categories") && (
          <Route path="/categories" element={<Category />}>
            <Route path=":categoryId" element={<CategoryChildren />} />
          </Route>
        )}
        {hasPermission("read_category_attrs") && (
          <Route
            path="/categories/:categoryId/attributes"
            element={<Attributes />}
          />
        )}
        {hasPermission("read_products") && (
          <Route path="/products" element={<Product />} />
        )}
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/products/set-attr" element={<SetAttribute />} />
        <Route path="/products/gallery" element={<ProductGallery />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/guranties" element={<Guranties />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/discounts" element={<Discounts />}>
          <Route path="add-discount-code" element={<AddDiscount />} />
        </Route>
        <Route path="/carts" element={<Carts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/deliveries" element={<Deliveries />} />

        <Route path="/users" element={<Users />}>
          <Route path="add-user" element={<AddUser />} />
        </Route>

        <Route path="/roles" element={<Roles />}>
          <Route path="add-role" element={<AddRole />} />
        </Route>
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Dashboard />} />
      </Routes> */}
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

        <Route path="/carts" element={<Carts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/deliveries" element={<Deliveries />} />

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
