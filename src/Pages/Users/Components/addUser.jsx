import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalsContainer from "../../../Components/ModalsContainer";
import SubmitButton from "../../../Components/Form/SubmitButton";
import FormikControl from "../../../Components/Form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import { Form, Formik } from "formik";

const AddUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userIdToEdit, SetUserIdToEdit] = useState(null);
  const [reInitialValues, SetReInitialValues] = useState(null);

  return (
    // <ModalsContainer
    //   className={"show d-block"}
    //   id={"add_user_modal"}
    //   title={"افزودن کاربر"}
    //   fullScreen={true}
    //   closeFunction={() => navigate(-1)}
    // >
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="فقط از حروف استفاده شود"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             نام
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="فقط از حروف استفاده شود"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             نام خانوادگی
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="number"
    //             className="form-control"
    //             placeholder="فقط از عدد استفاده شود"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             کد ملی
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="number"
    //             className="form-control"
    //             placeholder="فقط از عدد استفاده شود"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             شماره موبایل
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="فقط فرمت ایمیل (email@yourhost.com)"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             ایمیل
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <span className="input-group-text justify-content-center pointer">
    //             <i className="fas fa-eye"></i>
    //           </span>
    //           <input
    //             type="password"
    //             className="form-control"
    //             placeholder="حد اقل 8 کارکتر"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             رمز عبور
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8 row px-0 my-3">
    //         <label>تاریخ تولد:</label>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <select className="form-control">
    //               <option value="">انتخاب کنید</option>
    //               <option value="1">1</option>
    //               <option value="2">2</option>
    //               <option value="3">3</option>
    //             </select>
    //             <span className="input-group-text w_8rem justify-content-center">
    //               روز
    //             </span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <select className="form-control">
    //               <option value="">انتخاب کنید</option>
    //               <option value="1">1</option>
    //               <option value="2">2</option>
    //               <option value="3">3</option>
    //             </select>
    //             <span className="input-group-text w_8rem justify-content-center">
    //               ماه
    //             </span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <select className="form-control">
    //               <option value="">انتخاب کنید</option>
    //               <option value="1">1368</option>
    //               <option value="1">1300</option>
    //               <option value="2">1301</option>
    //               <option value="3">1302</option>
    //             </select>
    //             <span className="input-group-text w_8rem justify-content-center">
    //               سال
    //             </span>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-6 col-lg-8 row px-0 my-3">
    //         <label>تاریخ ثبت موبایل:</label>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <select className="form-control">
    //               <option value="">انتخاب کنید</option>
    //               <option value="1">1</option>
    //               <option value="2">2</option>
    //               <option value="3">3</option>
    //             </select>
    //             <span className="input-group-text w_8rem justify-content-center">
    //               روز
    //             </span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <select className="form-control">
    //               <option value="">انتخاب کنید</option>
    //               <option value="1">1</option>
    //               <option value="2">2</option>
    //               <option value="3">3</option>
    //             </select>
    //             <span className="input-group-text w_8rem justify-content-center">
    //               ماه
    //             </span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <select className="form-control">
    //               <option value="">انتخاب کنید</option>
    //               <option value="1">1400</option>
    //               <option value="1">1399</option>
    //               <option value="2">1398</option>
    //               <option value="3">1397</option>
    //             </select>
    //             <span className="input-group-text w_8rem justify-content-center">
    //               سال
    //             </span>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <select className="form-control">
    //             <option value="1">مرد</option>
    //             <option value="1">زن</option>
    //             <option value="2">نامشخص</option>
    //           </select>
    //           <span className="input-group-text w_8rem justify-content-center">
    //             جنسیت
    //           </span>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-6 col-lg-8 row px-0 mt-3">
    //         <label>آدرس:</label>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <input type="text" className="form-control" placeholder="" />
    //             <span className="input-group-text w_8rem justify-content-center">
    //               کشور
    //             </span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <input type="text" className="form-control" placeholder="" />
    //             <span className="input-group-text w_8rem justify-content-center">
    //               استان
    //             </span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-md-4">
    //           <div className="input-group my-1 dir_ltr">
    //             <input type="text" className="form-control" placeholder="" />
    //             <span className="input-group-text w_8rem justify-content-center">
    //               شهر
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8 mb-3">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="خیابان - کوچه و ..."
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             ادامه آدرس
    //           </span>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="مثلا @qasem"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             اینستاگرام
    //           </span>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="مثلا @qasem"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             تلگرام
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-12 col-md-6 col-lg-8">
    //         <div className="input-group my-1 dir_ltr">
    //           <input type="file" className="form-control" placeholder="تصویر" />
    //           <span className="input-group-text justify-content-center">
    //             تصویر
    //           </span>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-6 col-lg-8 col-md-6 col-lg-8 my-1">
    //         <div className="input-group mb-2 dir_ltr">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="قسمتی از نقش مورد نظر را وارد کنید"
    //             list="roleLists"
    //           />
    //           <span className="input-group-text w_8rem justify-content-center">
    //             نقش ها
    //           </span>
    //           <datalist id="roleLists">
    //             <option value="نقش شماره 1" />
    //             <option value="نقش شماره 2" />
    //             <option value="نقش شماره 3" />
    //           </datalist>
    //         </div>
    //         <div className="col-12 col-md-6 col-lg-8">
    //           <span className="chips_elem">
    //             <i className="fas fa-times text-danger"></i>
    //             نقش 1
    //           </span>
    //           <span className="chips_elem">
    //             <i className="fas fa-times text-danger"></i>
    //             نقش 2
    //           </span>
    //         </div>
    //       </div>
    //       <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
    //         <button className="btn btn-primary ">ذخیره</button>
    //       </div>
    //     </div>
    //   </div>
    // </ModalsContainer>
    <ModalsContainer
      className="show d-block"
      id={"add_user_modal"}
      title={"افزودن کاربر"}
      fullScreen={true}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setData, userIdToEdit)
          }
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form className="row justify-content-center">
                <div className="row justify-content-center">
                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="user_name"
                    label="نام کاربری"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="first_name"
                    label="نام "
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />
                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="last_name"
                    label="نام خانوادگی"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="phone"
                    label="شماره موبایل"
                    placeholder="فقط از اعداد استفاده کنید"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="email"
                    label="ایمیل"
                    placeholder="فقط فرمت ایمیل (email@yourhost.com)"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="password"
                    label="کلمه عبور"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />

                  <FormikControl
                    className="col-md-8"
                    control="date"
                    formik={formik}
                    name="birth_date"
                    label="تاریخ تولد"
                    initialDate={undefined}
                    yearsLimit={{ from: 100, to: -10 }}
                  />

                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={[
                      { id: 1, value: "مرد" },
                      { id: 0, value: "زن" },
                    ]}
                    name="gender"
                    label="جنسیت"
                  />

                  <FormikControl
                    label="نقش ها"
                    className="col-md-6 col-lg-8"
                    control="searchableSelect"
                    options={[{ id: 1, value: "تست" }]}
                    name="roles_id"
                    firstItem="لطفا نقش های مورد نظر را انتخاب کنید"
                    resultType="array"
                    initialItems={[]}
                  />

                  <div className="btn_box text-center col-12 mt-4">
                    <SubmitButton />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalsContainer>
  );
};
export default AddUser;
