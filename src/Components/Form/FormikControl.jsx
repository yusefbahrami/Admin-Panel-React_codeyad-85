import React from "react";
import Select from "./Controls/Select";
import Input from "./Controls/Input";
import Textarea from "./Controls/Textarea";
import Switch from "./Controls/Switch";
import File from "./Controls/File";
import MultiSelect from "./Controls/MultiSelect";
import SearchableSelect from "./Controls/SearchableSelect";
import CkEditor from "./Controls/CkEditor";
import Date from "./Controls/Date";

const FormikControl = (props) => {
  switch (props.control) {
    case "select":
      return <Select {...props} />;
    case "multiSelect":
      return <MultiSelect {...props} />;
    case "searchableSelect":
      return <SearchableSelect {...props} />;
    case "input":
      return <Input {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "ckeditor":
      return <CkEditor {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "file":
      return <File {...props} />;
    case "date":
      return <Date {...props} />;

    default:
      return null;
  }
};
export default FormikControl;
