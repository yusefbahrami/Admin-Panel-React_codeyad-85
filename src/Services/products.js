import httpService from "./httpService";

export const getProductService = (page, countOnPage, searchChar) => {
  return httpService(
    `/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get",
    null,
    "application/json"
  );
};

export const deleteProductService = (productId) => {
  return httpService(
    `/admin/products/${productId}`,
    "delete",
    null,
    "application/json"
  );
};
