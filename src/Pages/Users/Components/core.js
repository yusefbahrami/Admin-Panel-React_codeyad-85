import * as Yup from "yup";
import jMoment from "jalali-moment";
import { convertFormDateToMiladi } from "../../../Utils/convertDate";
import { addNewUserService, editUserService } from "../../../Services/users";
import { Alert } from "../../../Utils/alerts";

export const initialValues = {
  user_name: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  birth_date: "",
  gender: 1,
  roles_id: [],
};

export const onSubmit = async (values, actions, setData, userId) => {
  values = {
    ...values,
    birth_date: values.birth_date
      ? convertFormDateToMiladi(values.birth_date)
      : null,
  };
  if (userId) {
    const res = await editUserService(userId, values);
    if (res.status == 200) {
      setData((oldData) => {
        let newData = [...oldData];
        const index = newData.findIndex((d) => d.id == userId);
        newData[index] = res.data.data;
        return newData;
      });
      Alert("success", "عملیات موفق", res.data.message);
      actions.resetForm();
    }
  } else {
    const res = await addNewUserService(values);
    if (res.status == 201) {
      setData((oldData) => [...oldData, res.data.data]);
      Alert("success", "عملیات موفق", res.data.message);
      actions.resetForm();
    }
  }
};

export const validationSchema = Yup.object().shape({
  user_name: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  first_name: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  last_name: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  password: Yup.string().when("isEditing", {
    is: true,
    then: Yup.string().matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
    otherwise: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
        "فقط از حروف و اعداد استفاده شود"
      ),
  }),
  phone: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  email: Yup.string().email("لطفا فرمت ایمیل را رعایت کنید"),
  birth_date: Yup.string().matches(
    /^[0-9/\ \s-]+$/,
    "فقط ازاعداد و خط تیره استفاده شود"
  ),
  gender: Yup.number(),
  roles_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید"),
});
