import React, { Fragment, useEffect, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../../Components/Form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import SubmitButton from "../../../Components/Form/SubmitButton";

const AddGurantee = ({ setData, guranteeToEdit, setGuranteeToEdit }) => {
  const [reInitialValues, setReInitialValues] = useState(null);

  useEffect(() => {
    if (guranteeToEdit) {
      setReInitialValues({
        title: guranteeToEdit.title,
        descriptions: guranteeToEdit.descriptions || "",
        length: guranteeToEdit.length || "",
        length_unit: guranteeToEdit.length_unit || "",
      });
    } else {
      setReInitialValues(null);
    }
  }, [guranteeToEdit]);
  return (
    <Fragment>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_guarantee_modal"
        onClick={() => setGuranteeToEdit(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        id={"add_guarantee_modal"}
        title={guranteeToEdit ? "ویرایش گارانتی" : "افزودن گارانتی"}
        fullScreen={false}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitialValues || initialValues}
              onSubmit={(values, actions) =>
                onSubmit(values, actions, setData, guranteeToEdit)
              }
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان"
                  placeholder="فقط حروف و اعداد"
                />
                <FormikControl
                  control="textarea"
                  type="text"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="فقط حروف و اعداد"
                />
                <FormikControl
                  control="input"
                  type="number"
                  name="length"
                  label="مدت گارانتی"
                  placeholder="فقط اعداد"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="length_unit"
                  label="واحد"
                  placeholder="فقط حروف "
                />
                <div className="btn_box text-center col-12">
                  <SubmitButton text={"ذخیره"} />
                </div>
              </Form>
            </Formik>
            {/* <div className="col-12">
              <div className="input-group my-3 dir_ltr">
                <input type="text" className="form-control" placeholder="" />
                <span className="input-group-text w_8rem justify-content-center">
                  عنوان گارانتی
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group my-3 dir_ltr">
                <input type="text" className="form-control" placeholder="" />
                <span className="input-group-text w_8rem justify-content-center">
                  توضیحات گارانتی
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group my-3 dir_ltr">
                <input
                  type="text"
                  className="form-control"
                  placeholder=" به ماه"
                />
                <span className="input-group-text w_8rem justify-content-center">
                  مدت گارانتی
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
export default AddGurantee;
