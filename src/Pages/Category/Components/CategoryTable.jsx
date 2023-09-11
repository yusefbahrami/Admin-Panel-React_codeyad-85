import React, { Fragment, useEffect, useState } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddCategory from "./AddCategory";
import { getCategoriesService } from "../../../Services/category";
import { Alert } from "../../../Utils/alerts";
import ShowInMenu from "./tableAdditions/ShowInMenu";
import Actions from "./tableAdditions/Actions";
import { Outlet, useLocation, useParams } from "react-router-dom";
import jMoment from "moment-jalaali";
import {
  convertDateToJalaali,
  dateToJalaali,
} from "../../../Utils/convertDate";

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
  ];

  const additionalField = [
    {
      title: "تاریخ",
      elements: (rowData) => convertDateToJalaali(rowData.created_at),
    },
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
      <Outlet />
      {data.length ? (
        <PaginatedTable
          data={data}
          dataInfo={dataInfo}
          additionalField={additionalField}
          searchParams={searchParams}
          numOfPage={2}
        >
          <AddCategory />
        </PaginatedTable>
      ) : (
        <h5 className="text-center text-danger my-5">دیتایی یافت نشد!</h5>
      )}
    </Fragment>
  );
};
export default CategoryTable;
