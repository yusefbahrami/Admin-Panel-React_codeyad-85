import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Actions = ({ handleDeleteDiscount, rowData }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کد تخفیف"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() =>
          navigate("/discounts/add-discount-code", {
            state: { discountToEdit: rowData },
          })
        }
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کد تخفیف"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handleDeleteDiscount(rowData)}
      ></i>
    </Fragment>
  );
};
export default Actions;
