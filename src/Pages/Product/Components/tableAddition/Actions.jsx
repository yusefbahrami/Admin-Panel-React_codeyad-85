import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ActionIcon from "../../../../Components/ActionIcon";

const Actions = ({ rowData, handleDeleteProduct }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      {/* <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        onClick={() => {
          navigate("/products/add-product", {
            state: { productToEdit: rowData },
          });
        }}
      ></i>
      <i
        className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
        title="ثبت ویژگی"
        onClick={() => {
          navigate("/products/set-attr", {
            state: { selectedProduct: rowData },
          });
        }}
      ></i>
      <i
        className="fas fa-images text-success mx-1 hoverable_text pointer has_tooltip"
        title="مدیریت گالری"
        onClick={() =>
          navigate("/products/gallery", {
            state: { selectedProduct: rowData },
          })
        }
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف محصول"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handleDeleteProduct(rowData)}
      ></i> */}
      <ActionIcon
        icon="fas fa-edit text-warning"
        pTitle="update_product"
        title="ویرایش محصول"
        onClick={() =>
          navigate("/products/add-product", {
            state: { productToEdit: rowData },
          })
        }
      />

      <ActionIcon
        icon="fas fa-receipt text-info"
        pTitle="create_product_attr"
        title="ثبت ویژگی"
        onClick={() =>
          navigate("/products/set-attr", {
            state: { selectedProduct: rowData },
          })
        }
      />

      <ActionIcon
        icon="fas fa-images text-success"
        pTitle="create_product_image"
        title="مدیریت گالری"
        onClick={() =>
          navigate("/products/gallery", {
            state: { selectedProduct: rowData },
          })
        }
      />

      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_product"
        title="حذف محصول"
        onClick={() => handleDeleteProduct(rowData)}
      />
    </Fragment>
  );
};
export default Actions;
