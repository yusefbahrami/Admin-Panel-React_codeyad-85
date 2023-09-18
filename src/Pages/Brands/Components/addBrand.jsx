import React, { Fragment, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import { Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../../Components/Form/FormikControl";
import SubmitButton from "../../../Components/Form/SubmitButton";

const AddBrand = ({ setData }) => {
  return (
    <Fragment>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_brand_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        id={"add_brand_modal"}
        title={"افزودن برند"}
        fullScreen={false}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={initialValues}
              onSubmit={(value, actions) => onSubmit(value, actions, setData)}
              validationSchema={validationSchema}
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
            {/* <div className="col-12">
              <div className="input-group my-3 dir_ltr">
                <input
                  type="text"
                  className="form-control"
                  placeholder="کیبرد را در حالت لاتین قرار دهید"
                />
                <span className="input-group-text w_8rem justify-content-center">
                  عنوان لاتیتن برند
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group my-3 dir_ltr">
                <input
                  type="text"
                  className="form-control"
                  placeholder="کیبرد را در حالت فارسی قرار دهید"
                />
                <span className="input-group-text w_8rem justify-content-center">
                  عنوان فارسی برند
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group my-3 dir_ltr">
                <input
                  type="text"
                  className="form-control"
                  placeholder="متن کوتاه در مورد برند"
                />
                <span className="input-group-text w_8rem justify-content-center">
                  توضیحات برند
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group mb-3 dir_ltr">
                <input
                  type="file"
                  className="form-control"
                  placeholder="تصویر"
                />
                <span className="input-group-text w_6rem justify-content-center">
                  تصویر
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group mb-3 dir_ltr">
                <input
                  type="text"
                  className="form-control"
                  placeholder="یک کلمه در مورد تصویر"
                />
                <span className="input-group-text w_6rem justify-content-center">
                  توضیح تصویر
                </span>
              </div>
            </div>
            <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
              <button className="btn btn-primary ">ذخیره</button>
            </div> */}
          </div>
        </div>
      </ModalsContainer>
    </Fragment>
  );
};
export default AddBrand;
