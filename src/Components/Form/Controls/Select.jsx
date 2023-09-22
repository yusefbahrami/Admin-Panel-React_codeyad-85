import React from "react";
import ControlContainer from "../ControlContainer";
import { Field } from "formik";

const Select = ({
  options,
  name,
  label,
  className,
  firstItem,
  handleOnChange,
}) => {
  return (
    <ControlContainer name={name} className={className} label={label}>
      <Field>
        {/* uding Field insted FastField to rerender component when change the options */}
        {({ form }) => {
          return (
            <Field
              as="select"
              className="form-control"
              id={name}
              name={name}
              onChange={
                handleOnChange
                  ? (e) => handleOnChange(e.target.value, form)
                  : null
              }
            >
              <option value="">{firstItem}</option>
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.value}
                </option>
              ))}
            </Field>
          );
        }}
      </Field>
    </ControlContainer>
  );
};
export default Select;
