import React, { Fragment } from "react";

const Actions = () => {
  return (
    <Fragment>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کد تخفیف"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کد تخفیف"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </Fragment>
  );
};
export default Actions;
