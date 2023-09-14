import {
  createNewCategoryService,
  editCategoryService,
} from "../../../Services/category";
import * as Yup from "yup";
import { Alert } from "../../../Utils/alerts";

export const initialValues = {
  parent_id: "",
  title: "",
  descriptions: "",
  image: null,
  is_active: true,
  show_in_menu: true,
};

export const onSubmit = async (values, actions, setForceRender, editId) => {
  try {
    values = {
      ...values,
      is_active: values.is_active ? 1 : 0,
      show_in_menu: values.show_in_menu ? 1 : 0,
    };
    if (editId) {
      const res = await editCategoryService(editId, values);
      if (res.status == 200) {
        Alert("success", "ویرایش رکورد", "رکورد با موفقیت ویرایش شد!");
        actions.resetForm();
        setForceRender((last) => last + 1);
      }
    } else {
      const res = await createNewCategoryService(values);
      if (res.status == 201) {
        Alert("success", "ثبت رکورد", "رکورد با موفقیت ثبت شد!");
        actions.resetForm();
        setForceRender((last) => last + 1);
      }
    }
  } catch (error) {}
};

export const validationSchema = Yup.object({
  parent_id: Yup.number(),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  image: Yup.mixed()
    .nullable()
    .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg"
    ),
  is_active: Yup.boolean(),
  show_in_menu: Yup.boolean(),
});
