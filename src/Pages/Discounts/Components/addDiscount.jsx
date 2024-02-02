import React, { useEffect, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Form, Formik } from "formik";
import FormikControl from "../../../Components/Form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import SubmitButton from "../../../Components/Form/SubmitButton";
import { getAllProductsTitlesService } from "../../../Services/products";
import { convertDateToJalaali } from "../../../Utils/convertDate";

const AddDiscount = () => {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  // const [discountToEdit, setDiscountToEdit] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { setData } = useOutletContext();
  const location = useLocation();
  const discountToEdit = location.state?.discountToEdit;

  const [reInitialValues, setReInitialValues] = useState(null);

  const handlegetAllProductsTitlesService = async () => {
    const res = await getAllProductsTitlesService();
    if (res.status == 200) {
      setAllProducts(
        res.data.data.map((p) => {
          return { id: p.id, value: p.title };
        })
      );
    }
  };

  const handleSetProductSelectBox = (formik) => {
    const idsArr = formik.values.product_ids.split("-").filter((id) => id);
    const selectedProductArr = idsArr
      .map((id) => allProducts.filter((p) => p.id == id)[0])
      .filter((product) => product);
    console.log(selectedProductArr);
    return (
      <FormikControl
        className="animate__animated animate__shakeX"
        label="برای"
        control="searchableSelect"
        options={allProducts}
        name="product_ids"
        firstItem="محصول مورد نظر را انتخاب کنبد..."
        resultType="string"
        initialItems={
          selectedProductArr.length > 0 ? selectedProductArr : selectedProducts
        }
      />
    );
  };

  useEffect(() => {
    handlegetAllProductsTitlesService();

    if (discountToEdit) {
      setSelectedProducts(
        discountToEdit.products.map((p) => {
          return { id: p.id, value: p.title };
        })
      );

      const productIds = discountToEdit.products.map((p) => p.id).join("-");
      setReInitialValues({
        ...discountToEdit,
        expire_at: convertDateToJalaali(
          discountToEdit.expire_at,
          "jD/jM/jYYYY"
        ),
        for_all: discountToEdit.for_all ? true : false,
        produc_ids: productIds,
      });
    }
  }, []);
  return (
    <ModalsContainer
      className="show d-block animate__animated animate__fadeInDown animate__fast"
      id={"add_discount_modal"}
      title={discountToEdit ? `ویرایش کد تخفیف` : "افزودن کد تخفیف"}
      fullScreen={false}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <div className="row justify-content-center">
          <Formik
            initialValues={reInitialValues || initialValues}
            onSubmit={(values, actions) =>
              onSubmit(values, actions, setData, discountToEdit)
            }
            validationSchema={validationSchema}
            enableReinitialize
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
                    initialDate={discountToEdit?.expire_at || undefined}
                    yearsLimit={{ from: 10, to: 10 }}
                  />
                  <div className="row mb-2">
                    <div className="col-12 col-md-4">
                      <FormikControl
                        control="switch"
                        name="for_all"
                        label="برای همه"
                      />
                      {/* {console.log(formik)} */}
                    </div>
                  </div>
                  {!formik.values.for_all
                    ? handleSetProductSelectBox(formik)
                    : null}
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
