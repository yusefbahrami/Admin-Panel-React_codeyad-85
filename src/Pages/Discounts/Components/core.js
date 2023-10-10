import * as Yup from "yup";
import { convertFormDateToMiladi } from "../../../Utils/convertDate";
import {
  adNewDiscountsService,
  updateDiscountService,
} from "../../../Services/discounts";
import { Alert } from "../../../Utils/alerts";

export const initialValues = {
  title: "",
  code: "",
  percent: 0,
  expire_at: "",
  for_all: true,
  product_ids: "",
};

export const onSubmit = async (values, actions, setData, discountToEdit) => {
  values = {
    ...values,
    expire_at: convertFormDateToMiladi(values.expire_at),
  };
  // console.log(values);
  if (discountToEdit) {
    const res = await updateDiscountService(discountToEdit.id, values);
    if (res.status == 200) {
      Alert("success", "عملیات موفق!", res.data.message);
      setData((lastData) => {
        let newData = [...lastData];
        let index = newData.findIndex((d) => d.id == discountToEdit.id);
        newData[index] = res.data.data;
        return newData;
      });
    }
  } else {
    const res = await adNewDiscountsService(values);
    if (res.status == 201) {
      setData((oldData) => [...oldData, res.data.data]);
      Alert("success", "عملیات موفق!", res.data.message);
      actions.resetForm();
    }
  }
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  expire_at: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9/\ \s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  code: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9\s@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  percent: Yup.number().required("لطفا این قسمت را پر کنید"),
  for_all: Yup.boolean(),
  product_ids: Yup.string()
    .nullable()
    .when("for_all", {
      is: false,
      then: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
    }),
});
// export const validationSchema = Yup.object().shape({
//   title: Yup.string()
//     .required("لطفا این قسمت را پر کنید")
//     .matches(
//       /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
//       "فقط از حروف و اعداد استفاده شود"
//     ),
//   expire_at: Yup.string()
//     .required("لطفا این قسمت را پر کنید")
//     .matches(/^[0-9/\ \s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
//   code: Yup.string()
//     .required("لطفا این قسمت را پر کنید")
//     .matches(/^[a-zA-Z0-9\s@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
//   percent: Yup.number().required("لطفا این قسمت را پر کنید"),
//   for_all: Yup.boolean(),
//   product_ids: Yup.string().when("for_all", {
//     is: false,
//     then: Yup.string()
//       .required("لطفا این قسمت را پر کنید")
//       .matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
//   }),
// });
