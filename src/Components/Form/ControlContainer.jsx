import { ErrorMessage } from "formik";
import React from "react";
import FormikError from "./FormikError";

const ControlContainer = ({ children, name, className, label }) => {
  return (
    <div className={`col-12 ${className}`}>
      <div className="input-group mb-3 dir_ltr">
        {children}
        {label && (
          <span className="input-group-text w_6rem justify-content-center">
            {label}
          </span>
        )}
      </div>
      <ErrorMessage name={name} component={FormikError} />
    </div>
  );
};
export default ControlContainer;
