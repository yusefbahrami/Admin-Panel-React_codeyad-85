import React from "react";
import UsersTable from "./Components/UsersTable";
import AddUser from "./Components/addUser";

const Users = () => {
  return (
    <div id="manage_user_section" className="manage_user_section main_section">
      <h4 className="text-center my-3">مدیریت کاربران</h4>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder="قسمتی از نام یا نام خانوادگی را وارد کنید"
            />
            <span className="input-group-text">جستجو</span>
          </div>
        </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          <AddUser />
        </div>
      </div>
      <UsersTable />
    </div>
  );
};
export default Users;
