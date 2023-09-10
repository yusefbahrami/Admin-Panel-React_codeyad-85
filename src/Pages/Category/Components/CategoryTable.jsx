import React, { Fragment, useEffect, useState } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddCategory from "./AddCategory";
import { getCategoriesService } from "../../../Services/category";
import { Alert } from "../../../Utils/alerts";
import ShowInMenu from "./tableAdditions/ShowInMenu";
import Actions from "./tableAdditions/Actions";
import { useLocation, useParams } from "react-router-dom";

const CategoryTable = () => {
  const params = useParams(); // get id from navigate in Actions.jsx
  const location = useLocation(); // get parentData from state of navigate in Actions.jsx
  const [data, setData] = useState([]);
  const handleGetCategories = async () => {
    try {
      const res = await getCategoriesService(params.categoryId);
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
  }, [params]);

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
    <Fragment>
      {location.state ? (
        <h5 className="text-center">
          <span>زیر گروه: </span>
          <span className="text-info">{location.state.parentData.title}</span>
        </h5>
      ) : null}
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionalField={additionalField}
        searchParams={searchParams}
        numOfPage={2}
      >
        <AddCategory />
      </PaginatedTable>
    </Fragment>
  );
};
export default CategoryTable;
