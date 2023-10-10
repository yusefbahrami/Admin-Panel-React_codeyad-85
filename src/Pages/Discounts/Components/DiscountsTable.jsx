import React, { Fragment, useEffect, useState } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddButtonLink from "../../../Components/AddButtonLink";
import { convertDateToJalaali } from "../../../Utils/convertDate";
import Actions from "./tableAdditions/Actions";
import {
  deleteDiscountService,
  getAllDiscountsService,
} from "../../../Services/discounts";
import { Outlet } from "react-router-dom";
import { Alert, Confirm } from "../../../Utils/alerts";

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
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          handleDeleteDiscount={handleDeleteDiscount}
        />
      ),
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

  const handleDeleteDiscount = async (discount) => {
    if (await Confirm(discount.title, "آیا از حذف این آیتم اطمینان دارید؟")) {
      const res = await deleteDiscountService(discount.id);
      if (res.status == 200) {
        Alert("success", "عملیات موفق", "آیتم با موفقیت حذف شد!");
        setData((old) => old.filter((d) => d.id != discount.id));
      }
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
      <Outlet context={{ setData }} />
    </PaginatedTable>
  );
};
export default DiscountsTable;
