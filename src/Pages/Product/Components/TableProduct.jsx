import React, { Fragment, useEffect, useState } from "react";
import PaginatedDataTable from "../../../Components/PaginatedDataTable";
import AddProduct from "./Addproduct";
import Actions from "./tableAddition/Actions";
import { getProductService } from "../../../Services/products";
import { Alert } from "../../../Utils/alerts";

const TableProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // صفحه حال حاضر
  const [countOnPage, setCountOnPage] = useState(10); // تعداد محصول در هر صفحه
  const [pageCount, setPageCount] = useState(0); // تعداد کل صفحات

  const dataInfo = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
      elements: (rowData) =>
        rowData.categories.length > 0 ? rowData.categories[0].title : "-----",
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

  const handleGetProducts = async (page, count, char) => {
    try {
      setLoading(true);
      const res = await getProductService(page, count, char);
      if (res.status == 200) {
        setData(res.data.data);
        setPageCount(res.data.last_page);
      }
    } catch (error) {
      Alert("error", "خطا!", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (char) => {
    setSearchChar(char);
    handleGetProducts(1, countOnPage, char);
  };
  useEffect(() => {
    handleGetProducts(currentPage, countOnPage, searchChar);
  }, [currentPage]);
  return (
    <Fragment>
      {/* <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>دسته</th>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th>تعداد لایک</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>دسته شماره فلان</td>
            <td>محصول شماره1</td>
            <td>20,000 تومان</td>
            <td>10</td>
            <td>
              <span className="text-success mx-2">30</span>
              <span className="text-danger mx-2">10</span>
            </td>
            <td>فعال</td>
            <td>
              <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش محصول"
                data-bs-toggle="modal"
                data-bs-placement="top"
                data-bs-target="#add_product_modal"
              ></i>
              <i
                className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
                title="ثبت ویژگی"
                data-bs-toggle="modal"
                data-bs-target="#add_product_attr_modal"
              ></i>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف محصول"
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
        <AddProduct />
      </PaginatedDataTable>
    </Fragment>
  );
};
export default TableProduct;
