import React from "react";
import ProductTable from "./ProductTable";
import SaleChart from "./SaleChart";
import Cards from "./Cards";

const Dashboard = () => {
  return (
    // <!-- #region(collapsed) dashboard section start -->
    <div id="dashboard_section" className="dashboard_section main_section">
      <Cards />
      <div className="row">
        <ProductTable />
        <SaleChart />
      </div>
    </div>
    // <!-- #endregion content -->
  );
};
export default Dashboard;
