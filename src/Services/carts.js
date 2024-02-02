import httpService from "./httpService";

export const getAllPaginatedCartsService = (page, countOnPage, searchChar) => {
  return httpService(
    `/admin/carts?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get",
    null,
    "application/json"
  );
};

export const addNewCartService = (data) => {
  return httpService("/admin/carts", "post", data, "application/json");
};

export const getSingleCartService = (cartId) => {
  return httpService(`/admin/carts/${cartId}`, "get", null, "application/json");
};

export const editCartService = (cartId, data) => {
  return httpService(`/admin/carts/${cartId}`, "put", data, "application/json");
};

export const deleteCartService = (cartId) => {
  return httpService(
    `/admin/carts/${cartId}`,
    "delete",
    null,
    "application/json"
  );
};
