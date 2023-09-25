import { convertDataToFormData } from "./convertData";
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

export const createNewProductService = (data) => {
  let contentType = "application/json";
  if (data.image) {
    data = convertDataToFormData(data);
    contentType = "multipart/form-data";
  }
  return httpService("/admin/products", "post", data, contentType);
};

export const editProductService = (productId, data) => {
  return httpService(
    `/admin/products/${productId}`,
    "put",
    data,
    "application/json"
  );
};
