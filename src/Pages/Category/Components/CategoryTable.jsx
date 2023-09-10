import React, { useEffect, useState } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddCategory from "./AddCategory";
import { getCategoriesService } from "../../../Services/category";
import { Alert } from "../../../Utils/alerts";
import ShowInMenu from "./tableAdditions/ShowInMenu";
import Actions from "./tableAdditions/Actions";

const CategoryTable = () => {
  const [data, setData] = useState([]);
  const handleGetCategories = async () => {
    try {
      const res = await getCategoriesService();
      if (res.status == 200) {
        setData(res.data.data);
      } else {
        Alert("error", "مشکل!", res.data.message);
      }
    } catch (error) {
      Alert("error", "مشکلی در سمت سرور...!", error.message);
    }
  };
  useEffect(() => {
    handleGetCategories();
  }, []);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" },
    { field: "created_at", title: "تارخ" },
  ];

  const additionalField = [
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];
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
