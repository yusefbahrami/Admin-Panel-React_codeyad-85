import React, { Fragment, useEffect, useState } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddCategory from "./AddCategory";
import {
  deleteCategoryService,
  getCategoriesService,
} from "../../../Services/category";
import ShowInMenu from "./tableAdditions/ShowInMenu";
import Actions from "./tableAdditions/Actions";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { convertDateToJalaali } from "../../../Utils/convertDate";
import { Alert, Confirm } from "../../../Utils/alerts";

const CategoryTable = () => {
  const params = useParams(); // get id from navigate in Actions.jsx
  const location = useLocation(); // get parentData from state of navigate in Actions.jsx
  const [data, setData] = useState([]);
  const [forceRender, setForceRender] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleGetCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategoriesService(params.categoryId);
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (rowData) => {
    if (
      await Confirm(
        "حذف دسته‌بندی",
        `آیا از حذف دسته‌بندی ${rowData.title} اطمینان دارید؟`
      )
    ) {
      try {
        const res = await deleteCategoryService(rowData.id);
        // console.log(res);
        if (res.status == 200) {
          setData(data.filter((d) => d.id != rowData.id));
          Alert("success", "عملیات موفق!", res.data.message);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, [params, forceRender]);

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
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          handleDeleteCategory={handleDeleteCategory}
        />
      ),
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
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionalField={additionalField}
        searchParams={searchParams}
        loading={loading}
      >
        <AddCategory setForceRender={setForceRender} />
      </PaginatedTable>
    </Fragment>
  );
};
export default CategoryTable;
