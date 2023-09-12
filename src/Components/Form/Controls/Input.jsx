import React from "react";
import ControlContainer from "../ControlContainer";
import { FastField } from "formik";

const Input = ({ type, name, label, className, placeholder }) => {
  return (
    <ControlContainer name={name} className={className} label={label}>
      <FastField
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
      />
    </ControlContainer>
  );
};
export default Input;
