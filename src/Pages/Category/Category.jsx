import React from "react";
import CategoryTable from "./Components/CategoryTable";
const Category = () => {
  return (
    // <!-- #region(collapsed) add product category section start -->
    <div
      id="manage_product_category"
      className="manage_product_category main_section"
    >
      <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

      <CategoryTable />
    </div>
    // {/* <!-- #endregion content --> */}
  );
};
export default Category;
