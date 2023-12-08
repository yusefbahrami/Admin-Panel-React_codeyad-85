import React, { Fragment } from "react";

const Roles = ({ rowData }) => {
  return (
    <Fragment>
      {rowData.roles?.map((r) => (
        <div key={rowData.id + "_" + r.id} className="text-center">
          {r.title}
        </div>
      ))}
    </Fragment>
  );
};
export default Roles;
