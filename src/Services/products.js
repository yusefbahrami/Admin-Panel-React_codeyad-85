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

// ------ Attributes -------

export const addProductAttrService = (productId, data) => {
  return httpService(
    `/admin/products/${productId}/add_attr`,
    "post",
    data,
    "application/json"
  );
};

// -------- Image --------

export const addProductImageService = (productId, data) => {
  return httpService(
    `/admin/products/${productId}/add_image`,
    "post",
    data,
    "multipart/form-data"
  );
};

export const deleteProductImageService = (imageId) => {
  return httpService(
    `/admin/products/gallery/${imageId}`,
    "delete",
    null,
    "application/json"
  );
};

export const setMainProductImageService = (imageId) => {
  return httpService(
    `/admin/products/gallery/set_main/${imageId}`,
    "get",
    null,
    "application/json"
  );
};

// -------- Title --------
export const getAllProductsTitle = () => {
  return httpService(
    "/admin/products/all_titles",
    "get",
    null,
    "application/json"
  );
};
