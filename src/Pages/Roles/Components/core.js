import * as Yup from "yup";
import { Alert } from "../../../Utils/alerts";
import { addNewRoleService } from "../../../Services/users";

export const initialValues = {
  title: "",
  description: "",
  permissions_id: [],
};

export const onSubmit = async (values, actions, setData) => {
  const res = await addNewRoleService(values);
  if (res.status === 201) {
    Alert("success", "عملیات موفق", res.data.message);
    setData((old) => [...old, res.data.data]);
  }
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  description: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  permissions_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید"),
});
