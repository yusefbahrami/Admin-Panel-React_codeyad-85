import httpService from "./httpService";

export const getAllPaginatedOrdersService = (page, countOnPage, searchChar) => {
  return httpService(
    `/admin/orders?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get",
    null,
    "application/json"
  );
};

export const addNewOrderService = (data) => {
  return httpService("/admin/orders", "post", data, "application/json");
};

export const getSingleOrderService = (orderId) => {
  return httpService(
    `/admin/orders/${orderId}`,
    "get",
    null,
    "application/json"
  );
};

// export const editOrderService = (orderId, data) => {
//   return httpService(`/admin/orders/${orderId}`, "put", data, "application/json");
// };

export const deleteOrderService = (orderId) => {
  return httpService(
    `/admin/orders/${orderId}`,
    "delete",
    null,
    "application/json"
  );
};
