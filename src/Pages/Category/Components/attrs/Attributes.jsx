import { Fragment, useEffect, useState } from "react";
import PaginatedTable from "../../../../Components/PaginatedTable";
import { useLocation } from "react-router-dom";
import PrevPageButton from "../../../../Components/PrevPageButton";
import ShowInFilter from "./Components/ShowInFilter";
import AttrAction from "./Components/AttrAction";
import {
  deleteCategoryAttrService,
  getCategoryAttrService,
} from "../../../../Services/categoryAttr";
import { Alert, Confirm } from "../../../../Utils/alerts";
import AddAttr from "./Components/addAttr";

const Attributes = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attrToEdit, setAttrToEdit] = useState(null);
  const [reInitialValues, setReInitialValues] = useState(null);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "unit", title: "تعداد" },
  ];
  const additionalField = [
    {
      title: "نمایش در فیلتر",
      elements: (rowData) => <ShowInFilter rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <AttrAction
          rowData={rowData}
          attrToEdit={attrToEdit}
          setAttrToEdit={setAttrToEdit}
          handleDeleteCategoryAttr={handleDeleteCategoryAttr}
        />
      ),
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetCategoryAttrs = async () => {
    setLoading(true);
    try {
      const res = await getCategoryAttrService(location.state.categoryData.id);
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategoryAttr = async (attr) => {
    try {
      if (
        await Confirm(
          "حذف؟",
          `آیا از حذف ${attr.title} اطمینان دارید؟`,
          "warning"
        )
      ) {
        const res = await deleteCategoryAttrService(attr.id);
        if (res.status == 200) {
          Alert("success", "عملیات موفق!", res.data.message);
          setData((lastdata) => [...lastdata].filter((d) => d.id != attr.id));
        }
      }
    } catch (error) {
      Alert("error", "خطا!", error.message);
    }
  };
  useEffect(() => {
    handleGetCategoryAttrs();
  }, []);

  useEffect(() => {
    if (attrToEdit) {
      setReInitialValues({
        title: attrToEdit.title,
        unit: attrToEdit.unit,
        in_filter: attrToEdit.in_filter ? true : false,
      });
    } else {
      setReInitialValues(null);
    }
  }, [attrToEdit]);

  return (
    <Fragment>
      <h4 className="text-center my-3">مدیریت ویژگی های دسته بندی</h4>
      <h6 className="text-center my-3">
        ویژگی های :
        <span className="text-primary">
          {location.state.categoryData.title}
        </span>
      </h6>
      <div className="container">
        <div className="row justify-content-center">
          <AddAttr
            reInitialValues={reInitialValues}
            location={location}
            setData={setData}
            attrToEdit={attrToEdit}
            setAttrToEdit={setAttrToEdit}
          />

          <hr />

          <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            additionalField={additionalField}
            numOfPAge={5}
            searchParams={searchParams}
            loading={loading}
          >
            <PrevPageButton />
          </PaginatedTable>
        </div>
      </div>
    </Fragment>
  );
};
export default Attributes;
