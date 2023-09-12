import { FastField } from "formik";
import React from "react";

const Switch = ({ name, label }) => {
  return (
    <div className="form-check form-switch gap-3">
      <FastField
        className="form-check-input"
        type="checkbox"
        id={name}
        name={name}
      />
      <label htmlFor={name} className="form-check-label">
        {label}
      </label>
    </div>
  );
};
export default Switch;
