import React, { useEffect, useState } from "react";
import Actions from "./tableAddition/Actions";
import { getAllRolesService } from "../../../Services/users";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddButtonLink from "../../../Components/AddButtonLink";
import { Outlet } from "react-router-dom";

const RolesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "description", title: "توضیحات" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions rowData={rowData} handleDeleteRole={handleDeleteRole} />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetAllRoles = async () => {
    setLoading(true);
    const res = await getAllRolesService();
    setLoading(false);
    if (res.status == 200) {
      setData(res.data.data);
    }
  };

  const handleDeleteRole = (roleId) => {};

  useEffect(() => {
    handleGetAllRoles();
  }, []);
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      loading={loading}
      searchParams={searchParams}
    >
      <AddButtonLink href={"/roles/add-role"} />
      <Outlet context={{ setData }} />
    </PaginatedTable>
  );
};
export default RolesTable;
