import React, { Fragment, useEffect, useState } from "react";
import Actions from "./tableAdditional/Actions";
import {
  deleteGuranteeService,
  getAllGurantiesService,
} from "../../../Services/guranties";
import { Alert, Confirm } from "../../../Utils/alerts";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddGurantee from "./addGurantee";

const GurantiesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guranteeToEdit, setGuranteeToEdit] = useState(null);

  const handleDeleteGurantee = async (gurantee) => {
    try {
      if (
        await Confirm("هشدار!", `آیا از حذف ${gurantee.title} اطمینان دارید؟`)
      ) {
        const res = await deleteGuranteeService(gurantee.id);
        // console.log(res);
        if (res.status == 200) {
          setData((lastData) => lastData.filter((d) => d.id != gurantee.id));
          Alert("success", "عملیات موفق!", res.data.message);
        }
      }
    } catch (error) {}
  };
  const handleGetAllGuranties = async () => {
    setLoading(true);
    try {
      const res = await getAllGurantiesService();
      // console.log(res);
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
      Alert("error", "خطا!", error.message);
    } finally {
      setLoading(false);
    }
  };

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "descriptions", title: "توضیحات" },
    { field: "length", title: "مدت گارانتی" },
    { field: "length_unit", title: "واحد" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          setGuaranteeToEdit={setGuranteeToEdit}
          handleDeleteGuarantee={handleDeleteGurantee}
        />
      ),
    },
  ];

  // const additionalField = [
  //   {
  //     title: "عملیات",
  //     elements: (rowData) => (
  //       <Actions
  //         rowData={rowData}
  //         setGuaranteeToEdit={setGuranteeToEdit}
  //         handleDeleteGuarantee={handleDeleteGurantee}
  //       />
  //     ),
  //   },
  // ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  useEffect(() => {
    handleGetAllGuranties();
  }, []);
  return (
    <Fragment>
      <PaginatedTable
        data={data}
        // additionalField={additionalField}
        dataInfo={dataInfo}
        loading={loading}
        searchParams={searchParams}
      >
        <AddGurantee
          setData={setData}
          guranteeToEdit={guranteeToEdit}
          setGuranteeToEdit={setGuranteeToEdit}
        />
      </PaginatedTable>
    </Fragment>
  );
};
export default GurantiesTable;
