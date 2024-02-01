import React, { Fragment, useEffect, useState } from "react";
import { Alert, Confirm } from "../../../Utils/alerts";
import PaginatedDataTable from "../../../Components/PaginatedDataTable";
import AddButtonLink from "../../../Components/AddButtonLink";
import { Outlet } from "react-router-dom";
import Actions from "./tableAddition/Action";
import {
  deleteCartService,
  getAllPaginatedCartsService,
} from "../../../Services/carts";

const CartsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // صفحه حال حاضر
  const [countOnPage, setCountOnPage] = useState(10); // تعداد محصول در هر صفحه
  const [pageCount, setPageCount] = useState(0); // تعداد کل صفحات

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "user_id", title: "آی دی کاربر" },
    {
      field: null,
      title: "نام کاربر",
      elements: (rowData) =>
        `${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`,
    },
    {
      field: null,
      title: "موبایل کاربر",
      elements: (rowData) => rowData.user.phone,
    },
    {
      field: null,
      title: "تعداد کالاها",
      elements: (rowData) => rowData.items.length,
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions rowData={rowData} handleDeleteCart={handleDeleteCart} />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از شماره تماس کاربر را وارد کنید",
  };

  const handleGetCarts = async (
    page = currentPage,
    count = countOnPage,
    char = searchChar
  ) => {
    setLoading(true);
    const res = await getAllPaginatedCartsService(page, count, char);
    setLoading(false);
    if (res.status === 200) {
      setData(res.data.data.data);
      setPageCount(res.data.last_page);
    }
  };

  const handleSearch = (char) => {
    setSearchChar(char);
    handleGetCarts(1, countOnPage, char);
  };

  const handleDeleteCart = async (cart) => {
    if (await Confirm("حذف سبد", `آیا از حذف ${cart.id} اطمینان دارید؟`)) {
      const res = await deleteCartService(cart.id);
      if (res.status === 200) {
        Alert("success", "انجام شد", res.data.message);
        handleGetCarts(currentPage, countOnPage, searchChar);
      }
    }
  };

  useEffect(() => {
    handleGetCarts(currentPage, countOnPage, searchChar);
  }, [currentPage]);

  return (
    <PaginatedDataTable
      tableData={data}
      dataInfo={dataInfo}
      searchParams={searchParams}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageCount={pageCount}
      handleSearch={handleSearch}
    >
      <AddButtonLink href={"/carts/add-cart"} />
      <Outlet context={{ handleGetCarts }} />
    </PaginatedDataTable>
  );
};
export default CartsTable;
