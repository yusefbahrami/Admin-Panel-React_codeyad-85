import React from "react";
import DeliveriesTable from "./Components/DeliveriesTable";
import AddDelivery from "./Components/addDelivery";

const Deliveries = () => {
  return (
    <div
      id="manage_deliveries_section"
      className="manage_deliveries_section main_section"
    >
      <h4 className="text-center my-3">مدیریت نحوه ارسال</h4>
      <DeliveriesTable />
    </div>
  );
};
export default Deliveries;
