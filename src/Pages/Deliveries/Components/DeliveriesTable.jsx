import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PaginatedTable from "../../../Components/PaginatedTable";
import AddButtonLink from "../../../Components/AddButtonLink";
import {
  deleteDeliveryService,
  getAllDeliveriesService,
} from "../../../Services/deliveries";
import Actions from "./tableAddition/Actions";
import { Alert, Confirm } from "../../../Utils/alerts";

const DeliveriesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "amount", title: "هزینه" },
    {
      field: null,
      title: "مدت ارسال",
      elements: (rowData) => rowData.time + " " + rowData.time_unit,
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          handleDeleteDelivery={handleDeleteDelivery}
        />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از آی دی کاربر را وارد کنید",
    searchField: "title",
  };

  const handleGetAllDeliveries = async () => {
    setLoading(true);
    const res = await getAllDeliveriesService();
    console.log(res);
    setLoading(false);
    if (res.status === 200) setData(res.data.data);
  };

  const handleDeleteDelivery = async (delivery) => {
    if (await Confirm(delivery.title, "آیا از حذف این مورد اطمینان دارید؟")) {
      const res = await deleteDeliveryService(delivery.id);
      if (res.status === 200) {
        Alert("success", "حذف شد...!", res.data.message);
        setData((old) => old.filter((d) => d.id != delivery.id));
      }
    }
  };

  useEffect(() => {
    handleGetAllDeliveries();
  }, []);

  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      numOfPAge={8}
      searchParams={searchParams}
      loading={loading}
    >
      <AddButtonLink href={"/deliveries/add-delivery"} />
      <Outlet context={{ setData }} />
    </PaginatedTable>
  );
  // return (
  //   <Fragment>
  //     <table className="table table-responsive text-center table-hover table-bordered">
  //       <thead className="table-secondary">
  //         <tr>
  //           <th>#</th>
  //           <th>عنوان</th>
  //           <th>هزینه</th>
  //           <th>زمان ارسال</th>
  //           <th>واحد زمان</th>
  //           <th>عملیات</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td>1</td>
  //           <td>پست پیشتاز</td>
  //           <td>25,000 تومان</td>
  //           <td> 10</td>
  //           <td> روز</td>
  //           <td>
  //             <i
  //               className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
  //               title="ویرایش"
  //               data-bs-toggle="modal"
  //               data-bs-placement="top"
  //               data-bs-target="#add_delivery_modal"
  //             ></i>
  //             <i
  //               className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
  //               title="حذف "
  //               data-bs-toggle="tooltip"
  //               data-bs-placement="top"
  //             ></i>
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //     <nav
  //       aria-label="Page navigation example"
  //       className="d-flex justify-content-center"
  //     >
  //       <ul className="pagination dir_ltr">
  //         <li className="page-item">
  //           <a className="page-link" href="#" aria-label="Previous">
  //             <span aria-hidden="true">&raquo;</span>
  //           </a>
  //         </li>
  //         <li className="page-item">
  //           <a className="page-link" href="#">
  //             1
  //           </a>
  //         </li>
  //         <li className="page-item">
  //           <a className="page-link" href="#">
  //             2
  //           </a>
  //         </li>
  //         <li className="page-item">
  //           <a className="page-link" href="#">
  //             3
  //           </a>
  //         </li>
  //         <li className="page-item">
  //           <a className="page-link" href="#" aria-label="Next">
  //             <span aria-hidden="true">&laquo;</span>
  //           </a>
  //         </li>
  //       </ul>
  //     </nav>
  //   </Fragment>
  // );
};
export default DeliveriesTable;
