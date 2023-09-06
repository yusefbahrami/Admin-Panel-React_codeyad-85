import React from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import AuthFormikControl from "../../Components/AuthForm/AuthFormikControl";
import axios from "axios";

const initialValues = {
  phone: "",
  password: "",
  remember: false,
};
const onSubmit = (values) => {
  console.log(values);
  axios
    .post("https://ecomadminapi.azhadev.ir/api/auth/login", {
      ...values,
      remember: values.remember ? 1 : 0,
    })
    .then((res) => {
      console.log(res);
    });
};
const validationSchema = Yup.object({
  phone: Yup.number().required("لطفا این قسمت را پر کنید"),
  password: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9@!%$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  remember: Yup.boolean(),
});

const Login = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            console.log(formik);
            return (
              <div className="wrap-login100">
                <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                  <span className="login100-form-title">ورود اعضا</span>

                  <AuthFormikControl
                    formik={formik}
                    control="input"
                    type="text"
                    name="phone"
                    icon="fa fa-mobile"
                    label="موبایل"
                  />

                  <AuthFormikControl
                    formik={formik}
                    control="input"
                    type="password"
                    name="password"
                    icon="fa fa-lock"
                    label="رمز عبور"
                  />
                  <AuthFormikControl
                    control="switch"
                    name="remember"
                    label="مرا بخاطر بسپار"
                  />
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">ورود</button>
                  </div>
                  {/* <div className="text-center p-t-12 p-b-45">
                    <a className="txt2" href="#">
                      فراموش کردید؟
                    </a>
                  </div>
                  <div className="text-center pos-absolute m-auto w-100 bottom-0">
                    <a className="txt2" href="#">
                      ثبت نام
                      <i
                        className="fa fa-long-arrow-left m-l-5"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div> */}
                </Form>
                <div className="login100-pic js-tilt" data-tilt>
                  <img src="/auth/images/img-01.png" alt="IMG" />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
