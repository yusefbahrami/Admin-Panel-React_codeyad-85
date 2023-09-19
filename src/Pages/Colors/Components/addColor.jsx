import React, { Fragment, useEffect, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import { FastField, Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import SubmitButton from "../../../Components/Form/SubmitButton";
import FormikControl from "../../../Components/Form/FormikControl";

const AddColor = ({ setData, colorToEdit, setColorToEdit }) => {
  const [reInitialValues, setReInitialValues] = useState(null);
  const [colorPickerValue, setColorPickerValue] = useState("#C75C5C");

  const handleChangeColorCodeField = (e, form) => {
    setColorPickerValue(e.target.value);
    form.setFieldValue("code", e.target.value);
  };

  useEffect(() => {
    if (colorToEdit) {
      setReInitialValues({
        title: colorToEdit.title,
        code: colorToEdit.code,
      });
      setColorPickerValue(colorToEdit.code);
    } else {
      setReInitialValues(null);
      setColorPickerValue("#C75C5C");
    }
  }, [colorToEdit]);

  return (
    <Fragment>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_color_modal"
        onClick={() => setColorToEdit(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        fullScreen={false}
        id={"add_color_modal"}
        title={colorToEdit ? "ویرایش رنگ" : "افزودن رنگ جدید"}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitialValues || initialValues}
              onSubmit={(values, actions) =>
                onSubmit(values, actions, setData, colorToEdit)
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
                <FastField>
                  {({ form }) => {
                    return (
                      <div className="col-12 d-flex align-items-center justify-content-start">
                        <label
                          htmlFor="exampleColorInput"
                          className="form-label m-0"
                        >
                          انتخاب رنگ
                        </label>
                        <input
                          type="color"
                          className="form-control form-control-color mx-3"
                          id="code"
                          name="code"
                          title="انتخاب رنگ"
                          value={colorPickerValue}
                          onChange={(e) => handleChangeColorCodeField(e, form)}
                        />
                      </div>
                    );
                  }}
                </FastField>
                <div className="btn_box text-center col-12 mt-4">
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
export default AddColor;
