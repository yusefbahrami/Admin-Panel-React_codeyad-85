import { Fragment } from "react";

const AttrAction = ({
  rowData,
  attrToEdit,
  setAttrToEdit,
  handleDeleteCategoryAttr,
}) => {
  return (
    <Fragment>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش ویژگی"
        onClick={() => setAttrToEdit(rowData)}
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف ویژگی"
        onClick={() => handleDeleteCategoryAttr(rowData)}
      ></i>
    </Fragment>
  );
};
export default AttrAction;
