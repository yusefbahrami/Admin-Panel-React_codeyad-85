import React from "react";
import ControlContainer from "../ControlContainer";
import { FastField } from "formik";

const File = ({ name, label, className, placeholder }) => {
  return (
    <FastField>
      {({ form }) => {
        return (
          <ControlContainer className={className} name={name} label={label}>
            <input
              type="file"
              className="form-control"
              name={name}
              placeholder={placeholder}
              onChange={(e) => form.setFieldValue(name, e.target.files[0])}
            />
          </ControlContainer>
        );
      }}
    </FastField>
  );
};
export default File;
