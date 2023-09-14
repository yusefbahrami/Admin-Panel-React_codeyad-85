import React, { Fragment, useContext, useEffect, useState } from "react";
import ModalsContainer from "../../../Components/ModalsContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../../Components/Form/FormikControl";
import {
  getCategoriesService,
  getSingleCategoryService,
} from "../../../Services/category";
import { Alert } from "../../../Utils/alerts";
import SubmitButton from "../../../Components/Form/SubmitButton";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../../Context/categoryContext";
import { initialValues, onSubmit, validationSchema } from "./core";

const AddCategory = ({ setForceRender }) => {
  const params = useParams();
  const [parents, setParents] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  const { editId, setEditId } = useContext(CategoryContext);
  const [editCategory, setEditCategory] = useState(null);

  const handleGetSingleCategory = async () => {
    try {
      const res = await getSingleCategoryService(editId);
      // console.log(res);
      if (res.status == 200) {
        const oldCategory = res.data.data;
        setEditCategory(oldCategory);
      }
    } catch (error) {
      Alert("warning", "مشکل!", error.message);
    }
  };

  const handleGetParentsCategories = async () => {
    try {
      const res = await getCategoriesService();
      if (res.status == 200) {
        const allParents = res.data.data;
        setParents(
          allParents.map((p) => {
            return { id: p.id, value: p.title };
          })
        );
      }
    } catch (error) {
      Alert("warning", "مشکل!", "دسته‌بندی‌های والد یافت نشد!");
    }
  };

  useEffect(() => {
    handleGetParentsCategories();
  }, []);

  useEffect(() => {
    if (editId) {
      handleGetSingleCategory();
    } else {
      setEditId(null);
    }
  }, [editId]);

  useEffect(() => {
    if (editCategory) {
      setReInitialValues({
        parent_id: editCategory.parent_id || "",
        title: editCategory.title,
        descriptions: editCategory.descriptions || "",
        image: null,
        is_active: editCategory.is_active ? true : false,
        show_in_menu: editCategory.show_in_menu ? true : false,
      });
    } else if (params.categoryId) {
      setReInitialValues({ ...initialValues, parent_id: params.categoryId });
    } else {
      setReInitialValues(null);
    }
  }, [params.categoryId, editCategory]);

  return (
    <Fragment>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={() => {
          setEditId(null);
          setEditCategory(null);
        }}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        id={"add_product_category_modal"}
        fullScreen={true}
        title={
          editId
            ? `ویرایش: ${editCategory ? editCategory.title : ""}`
            : "افزودن دسته جدید"
        }
      >
        <Formik
          initialValues={reInitialValues || initialValues}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setForceRender, editId)
          }
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          <Form>
            <div className="container">
              <div className="row justify-content-center">
                {parents.length > 0 ? (
                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parents}
                    name="parent_id"
                    label="دسته والد"
                  />
                ) : null}

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  name="title"
                  label="عنوان دسته"
                  placeholder="عنوان دسته"
                />

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="توضیحات"
                />
                {editId ? null : (
                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="file"
                    name="image"
                    label="تصویر"
                    placeholder="تصویر"
                  />
                )}

                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="is_active"
                      label="وضعیت فعال"
                    />
                  </div>
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="show_in_menu"
                      label="نمایش در منو"
                    />
                  </div>
                </div>
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmitButton text={"ذخیره"} />
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </ModalsContainer>
    </Fragment>
  );
};
export default AddCategory;
