import React from "react";
import Select from "./Controls/Select";
import Input from "./Controls/Input";
import Textarea from "./Controls/Textarea";
import Switch from "./Controls/Switch";
import File from "./Controls/File";

const FormikControl = (props) => {
  switch (props.control) {
    case "select":
      return <Select {...props} />;
    case "input":
      return <Input {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "file":
      return <File {...props} />;

    default:
      return null;
  }
};
export default FormikControl;
