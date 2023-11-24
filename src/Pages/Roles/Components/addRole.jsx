import React, { Fragment, useEffect, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import SubmitButton from "../../../Components/Form/SubmitButton";
import FormikControl from "../../../Components/Form/FormikControl";
import { Form, Formik } from "formik";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {
  getAllPermissionsService,
  getSinglrRoleService,
} from "../../../Services/users";
import { initialValues, onSubmit, validationSchema } from "./core";

const AddRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleIdToEdit = location.state?.roleToEdit;
  const editType = location.state?.editType;

  const { setData } = useOutletContext();
  const [permissions, setPermissions] = useState([]);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [reInitialValues, setReInitialValues] = useState(null);

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

  const handleGetRoleToEditData = async () => {
    const res = await getSinglrRoleService(roleIdToEdit);
    if (res.status == 200) {
      const role = res.data.data;
      setRoleToEdit(role);
      editType === "role"
        ? setReInitialValues({
            title: role.title,
            description: role.description,
          })
        : setReInitialValues({
            permissions_id: role.permissions.map((p) => "" + p.id),
            editPermissions: true,
          });
    }
  };
  useEffect(() => {
    // handleGetAllPermissions();
    editType !== "role" && handleGetAllPermissions();
    roleIdToEdit && handleGetRoleToEditData();
  }, []);
  return (
    <ModalsContainer
      className="show d-block"
      id={"add_role_modal"}
      title={
        editType === "role"
          ? "ویرایش نقش"
          : editType === "permissions"
          ? "ویرایش مجوز های دسترسی:" + roleToEdit?.title || ""
          : "افزودن نقش کاربر"
      }
      fullScreen={true}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <Formik
          initialValues={reInitialValues || initialValues}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setData, roleIdToEdit, editType)
          }
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form className="row justify-content-center">
            {editType !== "permissions" ? (
              <Fragment>
                <FormikControl
                  className={editType == "role" ? "" : "col-md-8"}
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان نقش"
                  placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                />
                <FormikControl
                  className={editType == "role" ? "" : "col-md-8"}
                  control="textarea"
                  name="description"
                  label="توضیحات نقش"
                  placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                />
              </Fragment>
            ) : null}

            {editType !== "role" ? (
              <FormikControl
                className="col-md-8"
                control="checkbox"
                name="permissions_id"
                label="دسترسی ها: "
                options={permissions}
              />
            ) : null}

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
