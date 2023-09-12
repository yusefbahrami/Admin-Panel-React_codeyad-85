import React from "react";
import ControlContainer from "../ControlContainer";
import { FastField } from "formik";

const Select = ({ options, name, label, className }) => {
  return (
    <ControlContainer name={name} className={className} label={label}>
      <FastField as="select" className="form-control" id={name} name={name}>
        <option value="">دسته والد را انتخاب کنید</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.value}
          </option>
        ))}
      </FastField>
    </ControlContainer>
  );
};
export default Select;
