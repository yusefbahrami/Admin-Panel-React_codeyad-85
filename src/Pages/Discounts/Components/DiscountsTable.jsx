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
    <Fragment>
      {/* <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>عنوان </th>
            <th>کد</th>
            <th>درصد تخفیف</th>
            <th>تا تاریخ</th>
            <th>برای</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>تخفیف شماره 1</td>
            <td>takhfif1</td>
            <td>39%</td>
            <td>1400/10/12</td>
            <td>همه</td>
            <td>
              <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش کد"
                data-bs-toggle="modal"
                data-bs-placement="top"
                data-bs-target="#add_discount_modal"
              ></i>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف کد"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination dir_ltr">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        </ul>
      </nav> */}
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        loading={loading}
        searchParams={searchParams}
      >
        <AddButtonLink href={"/discounts/add-discount-code"} />
        <Outlet />
      </PaginatedTable>
    </Fragment>
  );
};
export default DiscountsTable;
