import { Form, Formik } from "formik";
import React from "react";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../../../../Components/Form/FormikControl";
import SubmitButton from "../../../../../Components/Form/SubmitButton";

const AddAttr = ({
  reInitialValues,
  location,
  setData,
  attrToEdit,
  setAttrToEdit,
}) => {
  return (
    <Formik
      initialValues={reInitialValues || initialValues}
      onSubmit={(values, actions) =>
        onSubmit(
          values,
          actions,
          location.state.categoryData.id,
          setData,
          attrToEdit,
          setAttrToEdit
        )
      }
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      <Form>
        <div className="row my-3">
          <FormikControl
            control="input"
            type="text"
            name="title"
            label="عنوان"
            className="col-md-6 col-lg-4 my-1"
            placeholder="عنوان ویژگی جدید"
          />

          <FormikControl
            control="input"
            type="text"
            name="unit"
            label="واحد"
            className="col-md-6 col-lg-4 my-1"
            placeholder="واحد ویژگی جدید"
          />

          <div className="col-8 col-lg-2 my-1">
            <FormikControl
              control="switch"
              name="in_filter"
              label="نمایش در فیلتر"
            />
          </div>
          <div className="col-4 col-lg-2 d-flex justify-content-center align-items-start my-1">
            <SubmitButton text={"ذخیره"} />
            {attrToEdit ? (
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => setAttrToEdit(null)}
              >
                انصراف
              </button>
            ) : null}
          </div>
        </div>
      </Form>
    </Formik>
  );
};
export default AddAttr;
