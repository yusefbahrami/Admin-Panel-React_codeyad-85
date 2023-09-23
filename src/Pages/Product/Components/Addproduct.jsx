import { Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../../Components/Form/FormikControl";
import { getCategoriesService } from "../../../Services/category";
import SpinnerLoad from "../../../Components/SpinnerLoad";

import PrevPageButton from "../../../Components/PrevPageButton";
import SubmitButton from "../../../Components/Form/SubmitButton";
import { getAllBrandsService } from "../../../Services/brands";
import { getAllColorsService } from "../../../Services/colors";
import { getAllGurantiesService } from "../../../Services/guranties";

const AddProduct = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);

  const getAllParentCategoryies = async () => {
    const res = await getCategoriesService();
    if (res.status == 200) {
      setParentCategories(
        res.data.data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };

  const handleSetMainCategories = async (value) => {
    try {
      setMainCategories("waiting");
      if (value > 0) {
        const res = await getCategoriesService(value);
        if (res.status == 200) {
          setMainCategories(
            res.data.data.map((d) => {
              return { id: d.id, value: d.title };
            })
          );
        } else {
          setMainCategories([]);
        }
        setSelectedCategories([]);
      }
    } catch (error) {
      setMainCategories([]);
    }
  };

  const getAllBrands = async () => {
    const res = await getAllBrandsService();
    if (res.status === 200) {
      setBrands(
        res.data.data.map((d) => {
          return { id: d.id, value: d.original_name };
        })
      );
    }
  };
  const getAllColors = async () => {
    const res = await getAllColorsService();
    if (res.status === 200) {
      setColors(
        res.data.data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };
  const getAllGuarantees = async () => {
    const res = await getAllGurantiesService();
    if (res.status === 200) {
      setGuarantees(
        res.data.data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };

  useEffect(() => {
    getAllParentCategoryies();
    getAllBrands();
    getAllColors();
    getAllGuarantees();
  }, []);
  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validationSchema={validationSchema}
      >
        {(formik) => {
          // console.log(formik);
          return (
            <Fragment>
              <h4 className="text-center my-3">افزودن محصول جدید</h4>
              <div className="text-left col-md-6 col-lg-8 m-auto my-3">
                <PrevPageButton />
              </div>
              <Form>
                <div className="container">
                  {/* <h4 className="text-center my-3">افزودن محصول جدید</h4> */}
                  {/* <div className="text-left col-md-6 col-lg-8 m-auto my-3">
                  <PrevPageButton />
                </div> */}
                  <div className="row justify-content-center">
                    <FormikControl
                      control="select"
                      options={parentCategories}
                      name="parentCats"
                      label="دسته والد"
                      firstItem="دسته مورد نظر را انتخاب کنید"
                      className="col-12 col-md-6 col-lg-8"
                      handleOnChange={handleSetMainCategories}
                    />
                    {/* {mainCategories == "waiting" ? (
                    <SpinnerLoad isSmall={true} colorClass={"text-primary"} />
                  ) : null}
                  <FormikControl
                    control="searchableSelect"
                    options={
                      typeof mainCategories == "object" ? mainCategories : []
                    }
                    name="category_ids"
                    label="دسته اصلی"
                    firstItem="دسته مورد نظر را انتخاب کنید"
                    className="col-12 col-md-6 col-lg-8"
                    handleOnChange={handleSetMainCategories}
                    resultType="string"
                  /> */}

                    {mainCategories == "waiting" ? (
                      <SpinnerLoad isSmall={true} colorClass={"text-primary"} />
                    ) : mainCategories != null ? (
                      <FormikControl
                        control="searchableSelect"
                        options={mainCategories}
                        name="category_ids"
                        label="دسته اصلی"
                        firstItem="دسته مورد نظر را انتخاب کنید"
                        className="col-12 col-md-6 col-lg-8"
                        handleOnChange={handleSetMainCategories}
                        resultType="string"
                      />
                    ) : null}

                    <FormikControl
                      label="عنوان *"
                      className="col-md-6 col-lg-8"
                      control="input"
                      type="text"
                      name="title"
                      placeholder="فقط از حروف و اعداد استفاده کنید"
                    />

                    <FormikControl
                      label="قیمت *"
                      className="col-md-6 col-lg-8"
                      control="input"
                      type="number"
                      name="price"
                      placeholder="فقط از اعداد استفاده کنید(تومان)"
                    />

                    <FormikControl
                      label="وزن "
                      className="col-md-6 col-lg-8"
                      control="input"
                      type="number"
                      name="weight"
                      placeholder="فقط از اعداد استفاده کنید(گِرم)"
                    />

                    <FormikControl
                      label="برند"
                      className="col-md-6 col-lg-8"
                      control="select"
                      options={brands}
                      name="brand_id"
                      firstItem="برند مورد نظر را انتخاب کنبد..."
                    />

                    {colors.length > 0 ? (
                      <FormikControl
                        label="رنگ"
                        className="col-md-6 col-lg-8"
                        control="searchableSelect"
                        options={colors}
                        name="color_ids"
                        firstItem="رنگ مورد نظر را انتخاب کنبد..."
                        resultType="string"
                      />
                    ) : null}
                    {guarantees.length > 0 ? (
                      <FormikControl
                        label="گارانتی"
                        className="col-md-6 col-lg-8"
                        control="searchableSelect"
                        options={guarantees}
                        name="guarantee_ids"
                        firstItem="گارانتی مورد نظر را انتخاب کنبد..."
                        resultType="string"
                      />
                    ) : null}

                    <FormikControl
                      label="توضیحات"
                      className="col-md-6 col-lg-8"
                      control="textarea"
                      name="descriptions"
                      placeholder="فقط از حروف واعداد استفاده شود"
                    />

                    <FormikControl
                      label="توضیحات کوتاه"
                      className="col-md-6 col-lg-8"
                      control="textarea"
                      name="short_descriptions"
                      placeholder="فقط از حروف واعداد استفاده شود"
                    />

                    <FormikControl
                      label="توضیحات  سبد"
                      className="col-md-6 col-lg-8"
                      control="textarea"
                      name="cart_descriptions"
                      placeholder="فقط از حروف واعداد استفاده شود"
                    />

                    <FormikControl
                      label="تصویر"
                      className="col-md-6 col-lg-8"
                      control="file"
                      name="image"
                      placeholder="تصویر"
                    />

                    <FormikControl
                      label="توضیح تصویر "
                      className="col-md-6 col-lg-8"
                      control="input"
                      type="text"
                      name="alt_image"
                      placeholder="فقط از حروف و اعداد استفاده کنید"
                    />

                    <FormikControl
                      label="کلمات کلیدی "
                      className="col-md-6 col-lg-8"
                      control="input"
                      type="text"
                      name="keywords"
                      placeholder="مثلا: تست1-تست2-تست3"
                    />

                    <FormikControl
                      label="موجودی "
                      className="col-md-6 col-lg-8"
                      control="input"
                      type="number"
                      name="stock"
                      placeholder="فقط از اعداد استفاده کنید(عدد)"
                    />

                    <FormikControl
                      label="درصد تخفیف "
                      className="col-md-6 col-lg-8"
                      control="input"
                      type="number"
                      name="discount"
                      placeholder="فقط از اعداد استفاده کنید(درصد)"
                    />
                    <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                      {/* <button className="btn btn-primary ">ذخیره</button> */}
                      <SubmitButton text={"ذخیره"} />
                      {/* <PrevPageButton /> */}
                    </div>
                  </div>
                </div>
              </Form>
            </Fragment>
          );
        }}
      </Formik>
    </Fragment>
  );
};
export default AddProduct;
