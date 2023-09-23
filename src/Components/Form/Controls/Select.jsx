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
  const setOptions = () => {
    return (
      <>
        <option value=""> {firstItem} </option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {" "}
            {o.value}{" "}
          </option>
        ))}
      </>
    );
  };
  return (
    <ControlContainer name={name} className={className} label={label}>
      <Field>
        {({ form }) => {
          return (
            <>
              {handleOnChange ? (
                <Field
                  as="select"
                  className="form-control"
                  id={name}
                  name={name}
                  onChange={(e) => handleOnChange(e.target.value, form)}
                >
                  {setOptions()}
                </Field>
              ) : (
                <Field
                  as="select"
                  className="form-control"
                  id={name}
                  name={name}
                >
                  {setOptions()}
                </Field>
              )}
            </>
          );
        }}
      </Field>
    </ControlContainer>
  );
};
export default Select;
