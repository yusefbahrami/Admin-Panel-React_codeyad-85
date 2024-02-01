import React from "react";
import CartsTable from "./Components/CartsTable";

const Carts = () => {
  return (
    <div id="manage_cart_section" className="manage_cart_section main_section">
      <h4 className="text-center my-3">مدیریت سبد خرید</h4>
      <CartsTable />
    </div>
  );
};
export default Carts;
