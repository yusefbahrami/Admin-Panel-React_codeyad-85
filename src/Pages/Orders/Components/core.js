import * as Yup from "yup";
import { convertFormDateToMiladi } from "../../../Utils/convertDate";
import { addNewOrderService } from "../../../Services/orders";
import { Alert } from "../../../Utils/alerts";

export const initialValues = {
  cart_id: "",
  discount_id: "",
  delivery_id: "",
  address: "",
  phone: "",
  email: "",
  pay_at: "",
  pay_card_number: "",
  pay_bank: "",
};

export const onSubmit = async (values, actions, navigate, handleGetOrders) => {
  values = {
    ...values,
    pay_at: convertFormDateToMiladi(values.pay_at),
  };
  const res = await addNewOrderService(values);
  if (res.status === 201) {
    Alert("success", "انجام شد", res.data.message);
    navigate(-1);
    handleGetOrders();
  }
};

export const validationSchema = Yup.object().shape({
  cart_id: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  discount_id: Yup.number().typeError("فقط عدد وارد کنید"),
  delivery_id: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  address: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  phone: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  email: Yup.string().email("فرمت ایمیل را رعایت کنید"),
  pay_at: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9/\ \s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  pay_card_number: Yup.number().typeError("فقط عدد وارد کنید"),
  pay_bank: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
});
