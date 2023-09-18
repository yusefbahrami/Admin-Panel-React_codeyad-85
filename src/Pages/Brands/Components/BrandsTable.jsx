import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBrandService,
  getAllBrandsService,
} from "../../../Services/brands";
import { Alert, Confirm } from "../../../Utils/alerts";
import { apiPath } from "../../../Services/httpService";
import Actions from "./tableAdditional/Actions";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddBrand from "./addBrand";

const BrandsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

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
    {
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          setBrandToEdit={setBrandToEdit}
          handleDeleteBrandService={handleDeleteBrandService}
        />
      ),
    },
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

  const handleDeleteBrandService = async (brand) => {
    if (
      await Confirm(
        "هشدار!",
        `آیا از حذف ${brand.original_name} اطمینان دارید؟`
      )
    ) {
      const res = await deleteBrandService(brand.id);
      if (res.status == 200) {
        Alert("success", "عملیات موفق!", res.data.message);
        setData((lastData) => lastData.filter((d) => d.id != brand.id));
      }
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
        <AddBrand
          setData={setData}
          brandToEdit={brandToEdit}
          setBrandToEdit={setBrandToEdit}
        />
      </PaginatedTable>
    </Fragment>
  );
};
export default BrandsTable;
