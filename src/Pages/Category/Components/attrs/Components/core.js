import {
  addCategoryAttrService,
  editCategoryAttrService,
} from "../../../../../Services/categoryAttr";
import { Alert } from "../../../../../Utils/alerts";
import * as Yup from "yup";

export const initialValues = { title: "", unit: "", in_filter: true };
export const onSubmit = async (
  values,
  actions,
  categoryId,
  setData,
  attrToEdit,
  setAttrToEdit
) => {
  try {
    values = {
      ...values,
      in_filter: values.in_filter ? 1 : 0,
    };
    if (attrToEdit) {
      const res = await editCategoryAttrService(attrToEdit.id, values);
      if (res.status == 200) {
        Alert("success", "عملیات موفق!", res.data.message);
        setData((oldData) => {
          const newData = [...oldData];
          const index = newData.findIndex((d) => d.id == attrToEdit.id);
          newData[index] = res.data.data;
          return newData;
        });
        actions.resetForm();
        setAttrToEdit(null); // clear attribute
      }
    } else {
      const res = await addCategoryAttrService(categoryId, values);
      if (res.status == 201) {
        Alert("success", "عملیات موفق!", res.data.message);
        setData((oldData) => [...oldData, res.data.data]); // set new data to reRender PaginatedTable
        actions.resetForm();
      }
    }
  } catch (error) {}
};
export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  unit: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  in_filter: Yup.boolean(),
});
