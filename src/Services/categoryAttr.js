import httpService from "./httpService";

export const getCategoryAttrService = (categoryId) => {
  return httpService(
    `/admin/categories/${categoryId}/attributes`,
    "get",
    null,
    "application/json"
  );
};

export const addCategoryAttrService = (categoryId, data) => {
  return httpService(
    `/admin/categories/${categoryId}/attributes`,
    "post",
    data,
    "application/json"
  );
};

export const editCategoryAttrService = (attrId, data) => {
  return httpService(
    `/admin/categories/attributes/${attrId}`,
    "put",
    data,
    "application/json"
  );
};
