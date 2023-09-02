import React, { Fragment } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddCategory from "./AddCategory";

const CategoryTable = () => {
  const data = [
    {
      id: "1",
      category: "aaa",
      title: "aaa",
      price: "1111",
      stock: "5",
      like_count: "2",
      status: "1",
    },
    {
      id: "2",
      category: "aaa",
      title: "bbb",
      price: "1111",
      stock: "5",
      like_count: "2",
      status: "1",
    },
    {
      id: "3",
      category: "aaa",
      title: "ccc",
      price: "1111",
      stock: "5",
      like_count: "2",
      status: "1",
    },
    {
      id: "4",
      category: "abc",
      title: "abc",
      price: "1111",
      stock: "5",
      like_count: "2",
      status: "1",
    },
    {
      id: "5",
      category: "cba",
      title: "cba",
      price: "1111",
      stock: "5",
      like_count: "2",
      status: "1",
    },
    {
      id: "6",
      category: "efg",
      title: "efg",
      price: "1111",
      stock: "5",
      like_count: "2",
      status: "1",
    },
    {
      id: "7",
      category: "fgc",
      title: "fgc",
      price: "1111",
      stock: "5",
      like_count: "2",
      status: "1",
    },
  ];
  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "price", title: "قیمت" },
  ];

  const additionalElements = (itemId) => {
    return (
      <Fragment>
        {" "}
        <i
          className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
          title="زیرمجموعه"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        ></i>
        <i
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش دسته"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_product_category_modal"
        ></i>
        <i
          className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
          title="افزودن ویژگی"
          data-bs-toggle="modal"
          data-bs-target="#add_product_category_attr_modal"
        ></i>
        <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف دسته"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        ></i>
      </Fragment>
    );
  };

  const additionalField = {
    title: "عملیات",
    elements: (itemId) => additionalElements(itemId),
  };
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      additionalField={additionalField}
      searchParams={searchParams}
      numOfPage={2}
    >
      <AddCategory />
    </PaginatedTable>
  );
};
export default CategoryTable;
