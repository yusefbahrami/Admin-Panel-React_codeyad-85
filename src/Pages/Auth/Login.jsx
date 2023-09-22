import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AuthFormikControl from "../../Components/AuthForm/AuthFormikControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../Utils/alerts";

const initialValues = {
  phone: "",
  password: "",
  remember: false,
};
const onSubmit = (values, submitMethodes, navigate) => {
  axios
    .post("https://ecomadminapi.azhadev.ir/api/auth/login", {
      ...values,
      remember: values.remember ? 1 : 0,
    })
    .then((res) => {
      if (res.status == 200) {
        localStorage.setItem("LoginToken", JSON.stringify(res.data));
        navigate("/");
      } else {
        Alert("error", "متاسفم...!", res.data.message);
      }
      submitMethodes.setSubmitting(false);
    })
    .catch((error) => {
      Alert("error", "متاسفم...!", error.message);
      submitMethodes.setSubmitting(false);
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
  const navigate = useNavigate();
  return (
    <div className="limiter">
      <div className="container-login100">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, submitMethodes) =>
            onSubmit(values, submitMethodes, navigate)
          }
          validationSchema={validationSchema}
        >
          {(formik) => {
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
                    <button
                      className="login100-form-btn"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? "لطفا صبر کنید..." : "ورود"}
                    </button>
                  </div>
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
