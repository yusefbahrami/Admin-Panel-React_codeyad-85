import { FastField } from "formik";
import React from "react";
import SpinnerLoad from "../SpinnerLoad";

const SubmitButton = ({ text }) => {
  return (
    <FastField>
      {({ form }) => {
        // console.log(form);
        return (
          <button className="btn btn-primary ">
            {form.isSubmitting ? (
              <SpinnerLoad
                colorClass={"text-white"}
                isSmall={true}
                inline={true}
              />
            ) : (
              text
            )}
          </button>
        );
      }}
    </FastField>
  );
};
export default SubmitButton;
