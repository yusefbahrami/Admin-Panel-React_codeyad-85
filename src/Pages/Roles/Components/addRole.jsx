import React, { useEffect, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import SubmitButton from "../../../Components/Form/SubmitButton";
import FormikControl from "../../../Components/Form/FormikControl";
import { Form, Formik } from "formik";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { getAllPermissionsService } from "../../../Services/users";
import { initialValues, onSubmit, validationSchema } from "./core";

const AddRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleToEdit = location.state?.roleToEdit;
  const { setData } = useOutletContext();
  const [permissions, setPermissions] = useState([]);
  const handleGetAllPermissions = async () => {
    const res = await getAllPermissionsService();
    if (res.status == 200) {
      setPermissions(
        res.data.data.map((p) => {
          return { id: p.id, title: p.description };
        })
      );
    }
  };

  useEffect(() => {
    handleGetAllPermissions();
  }, []);
  return (
    <ModalsContainer
      className="show d-block"
      id={"add_role_modal"}
      title={roleToEdit ? "ویرایش نقش" : "افزودن نقش کاربر"}
      fullScreen={true}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
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

            <FormikControl
              className="col-md-8"
              control="checkbox"
              name="permissions_id"
              label="دسترسی ها: "
              options={permissions}
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
