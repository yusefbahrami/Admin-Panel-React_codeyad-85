import React, { Fragment, useEffect, useState } from "react";
import PaginatedTable from "../../../Components/PaginatedTable";
import {
  deleteColorService,
  getAllColorsService,
} from "../../../Services/colors";
import { Alert, Confirm } from "../../../Utils/alerts";
import AddColor from "./addColor";
import Actions from "./tableAdditions/Actions";

const ColorsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(null);

  const handleGetAllColors = async () => {
    try {
      setLoading(true);
      const res = await getAllColorsService();
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
      Alert("error", "مشکل!", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteColor = async (color) => {
    try {
      if (await Confirm("هشدار!", `آیا از حذف ${color.title} اطمینان دارید؟`)) {
        const res = await deleteColorService(color.id);
        if (res.status == 200) {
          setData((lastData) => lastData.filter((d) => d.id != color.id));
          Alert("success", "عملیات موفق!", res.data.message);
        }
      }
    } catch (error) {
      Alert("error", "خطا!", error.message);
    }
  };

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "code", title: "کد رنگ" },
  ];

  const additionalField = [
    {
      title: "رنگ",
      elements: (rowData) => (
        <div
          className="w-100 h-100 d-block"
          style={{ background: rowData.code, color: rowData.code }}
        >
          ...
        </div>
      ),
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          handleDeleteColor={handleDeleteColor}
          setColorToEdit={setColorToEdit}
        />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };
  useEffect(() => {
    handleGetAllColors();
  }, []);

  return (
    <Fragment>
      <PaginatedTable
        data={data}
        loading={loading}
        additionalField={additionalField}
        dataInfo={dataInfo}
        searchParams={searchParams}
      >
        <AddColor
          setData={setData}
          colorToEdit={colorToEdit}
          setColorToEdit={setColorToEdit}
        />
      </PaginatedTable>
    </Fragment>
  );
};
export default ColorsTable;
