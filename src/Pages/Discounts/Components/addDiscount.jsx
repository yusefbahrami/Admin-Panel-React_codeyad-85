import React, { useEffect, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import FormikControl from "../../../Components/Form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import SubmitButton from "../../../Components/Form/SubmitButton";
import { getAllProductsTitle } from "../../../Services/products";

const AddDiscount = () => {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [discountToEdit, setDiscountToEdit] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [reInitialValues, setReInitialValues] = useState(null);

  const handleGetAllProductsTitle = async () => {
    const res = await getAllProductsTitle();
    if (res.status == 200) {
      setAllProducts(
        res.data.data.map((p) => {
          return { id: p.id, value: p.title };
        })
      );
    }
  };

  useEffect(() => {
    handleGetAllProductsTitle();
  }, []);
  return (
    <ModalsContainer
      className="show d-block animate__animated animate__fadeInDown animate__fast"
      id={"add_discount_modal"}
      title={"افزودن کد تخفیف"}
      fullScreen={false}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* <div className="col-12">
            <div className="input-group my-3 dir_ltr">
              <input
                type="text"
                className="form-control"
                placeholder="کیبرد را در حالت فارسی قرار دهید"
              />
              <span className="input-group-text w_8rem justify-content-center">
                عنوان کد
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group my-3 dir_ltr">
              <input
                type="text"
                className="form-control"
                placeholder="کیبرد را در حالت لاتین قرار دهید"
              />
              <span className="input-group-text w_8rem justify-content-center">
                کد تخفیف
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group my-3 dir_ltr">
              <input
                type="number"
                className="form-control"
                placeholder="فقط عدد "
              />
              <span className="input-group-text w_8rem justify-content-center">
                درصد تخفیف{" "}
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group my-3 dir_ltr">
              <input
                type="text"
                className="form-control"
                placeholder="مثلا 1400/10/10 "
              />
              <span className="input-group-text w_8rem justify-content-center">
                تاریخ اعتبار{" "}
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group my-3 dir_ltr">
              <input
                type="text"
                className="form-control"
                placeholder="قسمتی از نام محصول را وارد کنید"
                list="brandLists"
              />
              <span className="input-group-text w_8rem justify-content-center">
                برای
              </span>
              <datalist id="brandLists">
                <option value="محصول شماره 1" />
                <option value="محصول شماره 2" />
                <option value="محصول شماره 3" />
              </datalist>
            </div>
            <div className="col-12">
              <span className="chips_elem">
                <i className="fas fa-times text-danger"></i>
                محصول 1
              </span>
              <span className="chips_elem">
                <i className="fas fa-times text-danger"></i>
                محصول 2
              </span>
            </div>
          </div>
          <div className="btn_box text-center col-12 mt-4">
            <button className="btn btn-primary ">ذخیره</button>
          </div> */}
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions)}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    name="title"
                    label="عنوان تخفیف"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="code"
                    label="کد تخفیف"
                    placeholder="فقط از حروف لاتین و اعداد استفاده کنید"
                  />
                  <FormikControl
                    control="input"
                    type="number"
                    name="percent"
                    label="درصد تخفیف"
                    placeholder="فقط از اعداد استفاده کنید"
                  />
                  <FormikControl
                    control="date"
                    formik={formik}
                    name="expire_at"
                    label="تاریخ انقضاء"
                    yearsLimit={{ from: 10, to: 10 }}
                  />
                  <div className="row mb-2">
                    <div className="col-12 col-md-4">
                      <FormikControl
                        control="switch"
                        name="for_all"
                        label="برای همه"
                      />
                    </div>
                  </div>
                  {!formik.values.for_all ? (
                    <FormikControl
                      className="animate__animated animate__shakeX"
                      label="برای"
                      control="searchableSelect"
                      options={allProducts}
                      name="product_ids"
                      firstItem="محصول مورد نظر را انتخاب کنبد..."
                      resultType="string"
                      initialItems={selectedProducts}
                    />
                  ) : null}
                  <div className="btn_box text-center col-12 mt-4">
                    <SubmitButton text={"ذخیره"} />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalsContainer>
  );
};
export default AddDiscount;
