import { Fragment } from "react";

const AttrAction = () => {
  return (
    <Fragment>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش ویژگی"
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف ویژگی"
      ></i>
    </Fragment>
  );
};
export default AttrAction;
