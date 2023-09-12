import React from "react";
import ControlContainer from "../ControlContainer";
import { FastField } from "formik";

const Textarea = ({ name, label, className, placeholder }) => {
  return (
    <ControlContainer className={className} name={name} label={label}>
      <FastField
        as="textarea"
        name={name}
        className="form-control"
        placeholder={placeholder}
      />
    </ControlContainer>
  );
};
export default Textarea;
