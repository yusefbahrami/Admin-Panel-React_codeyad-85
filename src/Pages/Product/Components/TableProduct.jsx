import React, { Fragment, useEffect, useState } from "react";
import PaginatedDataTable from "../../../Components/PaginatedDataTable";
import Actions from "./tableAddition/Actions";
import {
  deleteProductService,
  getProductService,
} from "../../../Services/products";
import { Alert, Confirm } from "../../../Utils/alerts";
import AddButtonLink from "../../../Components/AddButtonLink";

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
    {
      field: null,
      title: "توضیحات محصول",
      elements: (rowData) =>
        rowData.categories.length > 0 ? (
          <span
            dangerouslySetInnerHTML={{ __html: rowData.descriptions }}
          ></span>
        ) : (
          "-----"
        ),
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions rowData={rowData} handleDeleteProduct={handleDeleteProduct} />
      ),
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

  const handleDeleteProduct = async (product) => {
    try {
      if (
        await Confirm("هشدار!", `آیا از حذف ${product.title} اطمینان دارید؟`)
      ) {
        const res = await deleteProductService(product.id);
        if (res.status == 200) {
          Alert("success", "عملیات موفق!", res.data.message);
          handleGetProducts(currentPage, countOnPage, searchChar);
        }
      }
    } catch (error) {
      Alert("error", "خطا!", error.message);
    }
  };

  useEffect(() => {
    handleGetProducts(currentPage, countOnPage, searchChar);
  }, [currentPage]);

  return (
    <Fragment>
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
        <AddButtonLink href={"/products/add-product"} />
      </PaginatedDataTable>
    </Fragment>
  );
};
export default TableProduct;
