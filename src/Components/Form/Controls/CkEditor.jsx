import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Field } from "formik";
import React from "react";
import ControlContainer from "../ControlContainer";

const CkEditor = ({ name, label, className, placeholder }) => {
  const handleOnFocus = (editor) => {};
  return (
    <Field>
      {({ form }) => {
        return (
          <ControlContainer className={className} name={name} label={label}>
            <CKEditor
              editor={ClassicEditor}
              data={form.values[name] || placeholder}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
                form.setFieldTouched(name);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                form.setFieldValue(name, data);
              }}
              onBlur={(event, editor) => {
                // console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                if (editor.getData() == `<p>${placeholder}</p>`) {
                  editor.setData("");
                }
              }}
            />
          </ControlContainer>
        );
      }}
    </Field>
  );
};
export default CkEditor;
