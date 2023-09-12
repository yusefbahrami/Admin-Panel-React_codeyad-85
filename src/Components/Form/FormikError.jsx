import React from "react";

const FormikError = ({ children }) => {
  return (
    <small className="d-block text-danger mb-4 error-message">{children}</small>
  );
};
export default FormikError;
