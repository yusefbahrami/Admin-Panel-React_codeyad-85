import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import FormikError from "../FormikError";

const MultiSelect = ({
  resultType,
  options,
  name,
  label,
  className,
  firstItem,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItems = (selectedId, formik) => {
    setSelectedItems((oldData) => {
      if (oldData.findIndex((d) => d.id == selectedId) && selectedId > 0) {
        const newData = [
          ...oldData,
          options.filter((o) => o.id == selectedId)[0],
        ];

        const selectedIds = newData.map((nd) => nd.id);
        const nameValue =
          resultType == "string" ? selectedIds.join("-") : selectedIds;
        // if resultType == "string" then:  "1-2-3"  else:   [1,2,3]

        formik.setFieldValue(name, nameValue);
        return newData;
      } else {
        return oldData;
      }
    });
  };

  const handleRemoveFromSelectedItems = (selectedId, formik) => {
    setSelectedItems((oldData) => {
      let newData = oldData.filter((d) => d.id != selectedId);
      const selectedIds = newData.map((nd) => nd.id);
      const nameValue =
        resultType == "string" ? selectedIds.join("-") : selectedIds;
      formik.setFieldValue(name, nameValue);
      return newData;
    });
  };

  return (
    <Field>
      {({ form }) => {
        return (
          <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
              <select
                className="form-control"
                id={name + "-select"}
                onChange={(e) => handleSelectItems(e.target.value, form)}
              >
                <option value=""> {firstItem} </option>
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.value}
                  </option>
                ))}
              </select>
              <label
                htmlFor={name + "-select"}
                className="input-group-text w_6rem justify-content-center"
              >
                {label}
              </label>
            </div>

            <ErrorMessage name={name} component={FormikError} />

            <div className="col-12 col-md-6 col-lg-8">
              {selectedItems.map((selectedItem) => (
                <span className="chips_elem" key={selectedItem.id}>
                  <i
                    className="fas fa-times text-danger"
                    onClick={() =>
                      handleRemoveFromSelectedItems(selectedItem.id, form)
                    }
                  ></i>
                  {selectedItem.value}
                </span>
              ))}
            </div>
          </div>
        );
      }}
    </Field>
  );
};
export default MultiSelect;
