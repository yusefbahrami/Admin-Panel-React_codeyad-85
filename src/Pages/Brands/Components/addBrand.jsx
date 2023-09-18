import React, { Fragment, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import { Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../../Components/Form/FormikControl";
import SubmitButton from "../../../Components/Form/SubmitButton";
import { apiPath } from "../../../Services/httpService";
import { useEffect } from "react";

const AddBrand = ({ setData, brandToEdit, setBrandToEdit }) => {
  const [reInitialValues, setReinitialValues] = useState(null);

  useEffect(() => {
    if (brandToEdit)
      setReinitialValues({
        original_name: brandToEdit.original_name,
        persian_name: brandToEdit.persian_name || "",
        descriptions: brandToEdit.descriptions || "",
        logo: null,
      });
    else setReinitialValues(null);
  }, [brandToEdit]);

  return (
    <Fragment>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_brand_modal"
        onClick={() => setBrandToEdit(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        id={"add_brand_modal"}
        title={brandToEdit ? "ویرایش برند" : "افزودن برند"}
        fullScreen={false}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitialValues || initialValues}
              onSubmit={(value, actions) =>
                onSubmit(value, actions, setData, brandToEdit)
              }
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  name="original_name"
                  label="عنوان لاتین"
                  placeholder="کیبرد را در حالت لاتین قرار دهید"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="persian_name"
                  label="عنوان فارسی"
                  placeholder="کیبرد را در حالت فارسی قرار دهید"
                />
                <FormikControl
                  control="textarea"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="توضیحات"
                />
                {brandToEdit ? (
                  <div className="btn_box text-center col-12 py-3">
                    <img
                      src={`${apiPath}/${brandToEdit.logo}`}
                      width="60"
                      alt="logo"
                    />
                  </div>
                ) : null}
                <FormikControl
                  control="file"
                  name="logo"
                  label="تصویر"
                  placeholder="تصویر"
                />
                <div className="btn_box text-center col-12">
                  <SubmitButton text={"ذخیره"} />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </ModalsContainer>
    </Fragment>
  );
};
export default AddBrand;
