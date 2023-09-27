import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrevPageButton from "../../../../Components/PrevPageButton";
import SpinnerLoad from "../../../../Components/SpinnerLoad";
import SubmitButton from "../../../../Components/Form/SubmitButton";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import FormikError from "../../../../Components/Form/FormikError";
import { initializingData, onSubmit } from "./core";

const SetAttribute = () => {
  const location = useLocation();
  const { selectedProduct } = location.state;

  const [attrs, setAttrs] = useState();
  const [initialValues, setInitialValues] = useState(null);
  const [validationSchema, setValidationSchema] = useState({});

  const handleGetAttributes = async () => {
    const { attrVar, initials, rules } = await initializingData(
      selectedProduct
    );

    setAttrs(attrVar);
    setInitialValues(initials);
    setValidationSchema(Yup.object(rules));
  };

  useEffect(() => {
    handleGetAttributes();
  }, []);

  return (
    <div className="container">
      <h4 className="text-center my-3">
        افزودن ویژگی محصول:
        <span className="text-primary">{selectedProduct.title}</span>
      </h4>
      <div className="text-left col-md-6 col-lg-8 m-auto my-3">
        <PrevPageButton />
      </div>
      <div className="row justify-content-center">
        {initialValues ? (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) =>
              onSubmit(values, actions, selectedProduct.id)
            }
            validationSchema={validationSchema}
          >
            <Form>
              {attrs.map((attr, index) => (
                <div
                  key={"group" + index}
                  className="row justify-content-center"
                >
                  <h6 className="text-center">گروه : {attr.groupTitle}</h6>
                  {attr.data.length > 0 ? (
                    attr.data.map((attrData) => (
                      <div
                        className="col-12 col-md-6 col-lg-8"
                        key={attrData.id}
                      >
                        <div className="input-group my-3 dir_ltr">
                          <span className="input-group-text w_6rem justify-content-center">
                            {attrData.unit}
                          </span>
                          <Field
                            name={attrData.id}
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                          <span className="input-group-text w_8rem justify-content-center">
                            {attrData.title}
                          </span>
                        </div>
                        <ErrorMessage
                          name={attrData.id}
                          component={FormikError}
                        />
                      </div>
                    ))
                  ) : (
                    <small className="text-center text-danger ">
                      هیچ ویژگی برای گروه های این محصول ایجاد نشده است
                    </small>
                  )}
                </div>
              ))}

              <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4 m-auto">
                <SubmitButton text={"ذخیره"} />
                {/* <PrevPageButton className="me-2" /> */}
              </div>
            </Form>
          </Formik>
        ) : (
          <SpinnerLoad />
        )}
      </div>
    </div>
  );
};
export default SetAttribute;
