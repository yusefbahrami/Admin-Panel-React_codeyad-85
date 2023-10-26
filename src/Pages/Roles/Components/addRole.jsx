import React from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import SubmitButton from "../../../Components/Form/SubmitButton";
import FormikControl from "../../../Components/Form/FormikControl";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

const AddRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleToEdit = location.state?.roleToEdit;
  return (
    <ModalsContainer
      className="show d-block"
      id={"add_role_modal"}
      title={roleToEdit ? "ویرایش نقش" : "افزودن نقش کاربر"}
      fullScreen={true}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <Formik>
          <Form className="row justify-content-center">
            <FormikControl
              className="col-md-8"
              control="input"
              type="text"
              name="title"
              label="عنوان نقش"
              placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
            />
            <FormikControl
              className="col-md-8"
              control="textarea"
              name="description"
              label="توضیحات نقش"
              placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
            />
            <div className="btn_box text-center col-12 mt-4">
              <SubmitButton text={"ذخیره"} />
            </div>
          </Form>
        </Formik>
      </div>
    </ModalsContainer>
  );
};
export default AddRole;
