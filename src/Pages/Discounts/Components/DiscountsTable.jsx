import React, { Fragment, useEffect, useState } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddButtonLink from "../../../Components/AddButtonLink";
import { convertDateToJalaali } from "../../../Utils/convertDate";
import Actions from "./tableAdditions/Actions";
import { getAllDiscountsService } from "../../../Services/discounts";
import { Outlet } from "react-router-dom";

const DiscountsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "code", title: "کد تخفیف" },
    { field: "percent", title: "درصد تخفیف" },
    {
      field: null,
      title: "تاریخ انقضا",
      elements: (rowData) => convertDateToJalaali(rowData.expire_at),
    },
    {
      field: null,
      title: "وضعیت",
      elements: (rowData) => (rowData.is_active ? "فعال" : "غیرفعال"),
    },
    {
      field: null,
      title: "مربوط به",
      elements: (rowData) => (rowData.for_all ? "همه" : "تعدادی از محصولات"),
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetAllDiscounts = async () => {
    setLoading(true);
    const res = await getAllDiscountsService();
    setLoading(false);
    if (res.status == 200) {
      setData(res.data.data);
    }
  };
  useEffect(() => {
    handleGetAllDiscounts();
  }, []);
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      loading={loading}
      searchParams={searchParams}
    >
      <AddButtonLink href={"/discounts/add-discount-code"} />
      <Outlet />
    </PaginatedTable>
  );
};
export default DiscountsTable;
