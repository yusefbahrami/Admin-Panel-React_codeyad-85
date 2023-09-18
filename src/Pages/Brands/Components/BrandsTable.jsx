import React, { Fragment, useEffect, useState } from "react";
import { getAllBrandsService } from "../../../Services/brands";
import { Alert } from "../../../Utils/alerts";
import { apiPath } from "../../../Services/httpService";
import Actions from "./tableAdditional/Actions";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddBrand from "./addBrand";

const BrandsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "original_name", title: "عنوان لاتین" },
    { field: "persian_name", title: "عنوان فارسی" },
    { field: "descriptions", title: "توضیحات" },
  ];

  const additionalField = [
    {
      title: "لوگو",
      elements: (rowData) =>
        rowData.logo ? (
          <img src={`${apiPath}/${rowData.logo}`} width={"40"} alt="logo" />
        ) : null,
    },
    { title: "عملیات", elements: (rowData) => <Actions rowData={rowData} /> },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "original_name",
  };

  const handleGetAllBrands = async () => {
    setLoading(true);
    try {
      const res = await getAllBrandsService();
      if (res.status == 200) {
        console.log(res);
        setData(res.data.data);
      } else {
        Alert("error", "مشکل!", res.data.message);
      }
    } catch (error) {
      Alert("error", "مشکل!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllBrands();
  }, []);

  return (
    <Fragment>
      <PaginatedTable
        data={data}
        additionalField={additionalField}
        dataInfo={dataInfo}
        loading={loading}
        searchParams={searchParams}
      >
        <AddBrand setData={setData} />
      </PaginatedTable>
    </Fragment>
  );
};
export default BrandsTable;
