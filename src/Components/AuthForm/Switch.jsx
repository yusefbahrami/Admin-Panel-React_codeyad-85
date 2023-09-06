import { FastField } from "formik";
import React from "react";

const Switch = ({ name, label }) => {
  return (
    <div className="form-check form-switch">
      <FastField
        className="form-check-input"
        type="checkbox"
        role="switch"
        name={name}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {label}
      </label>
    </div>
  );
};
export default Switch;
