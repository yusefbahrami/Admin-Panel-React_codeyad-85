import React from "react";
import Card from "./Card";
import ProductTable from "./ProductTable";
import SaleChart from "./SaleChart";

const Dashboard = () => {
  return (
    // <!-- #region(collapsed) dashboard section start -->
    <div id="dashboard_section" className="dashboard_section main_section">
      <div className="row">
        <Card
          title={"سبد خرید امروز"}
          currentValue={"7"}
          icon={"fas fa-shopping-basket"}
          description={"سبدهای خرید مانده امروز"}
          lastWeekValue={"13"}
          lastMonthValue={"18"}
        />
        <Card
          title={"سفارشات مانده امروز"}
          currentValue={"5"}
          icon={"fas fa-dolly"}
          description={"سفارشات معلق و فاقد پرداختی امروز"}
          lastWeekValue={"9"}
          lastMonthValue={"16"}
        />
        <Card
          title={"سفارشات امروز"}
          currentValue={"45"}
          icon={"fas fa-luggage-cart"}
          description={"سفارشات کامل و دارای پرداختی"}
          lastWeekValue={"263"}
          lastMonthValue={"1038"}
        />
        <Card
          title={"درآمد امروز"}
          currentValue={"1,500,000"}
          icon={"fas fa-money-check-alt"}
          description={"جمع مبالغ پرداختی (تومان)"}
          lastWeekValue={"6,380,000"}
          lastMonthValue={"22,480,000"}
        />
      </div>

      <div className="row">
        <ProductTable />
        <SaleChart />
      </div>
    </div>
    // <!-- #endregion content -->
  );
};
export default Dashboard;
