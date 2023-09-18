import {
  addNewGuranteeService,
  editGuranteeService,
} from "../../../Services/guranties";
import { Alert } from "../../../Utils/alerts";
import * as Yup from "yup";
export const initialValues = {
  title: "",
  descriptions: "",
  length: "",
  length_unit: "",
};

export const onSubmit = async (values, actions, setData, guaranteeToEdit) => {
  try {
    if (guaranteeToEdit) {
      const res = await editGuranteeService(guaranteeToEdit.id, values);
      if (res.status === 200) {
        Alert("success", "عملیات موفق!", res.data.message);
        setData((lastData) => {
          let newData = [...lastData];
          let index = newData.findIndex((d) => d.id == guaranteeToEdit.id);
          newData[index] = res.data.data;
          return newData;
        });
      }
    } else {
      const res = await addNewGuranteeService(values);
      console.log(res);
      if (res.status === 201) {
        Alert("success", "عملیات موفق!", res.data.message);
        setData((lastData) => [...lastData, res.data.data]);
      }
    }
    actions.resetForm();
  } catch (error) {}
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از اعداد و حروف لاتین استفاده شود"
    ),
  length: Yup.number(),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از اعداد و حروف استفاده شود"
  ),
  length_unit: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از اعداد و حروف لاتین استفاده شود"
  ),
});
