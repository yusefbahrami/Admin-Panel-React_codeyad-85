import httpService from "./httpService";

export const getAllColorsService = () => {
  return httpService("/admin/colors", "get", null, "application/json");
};

export const addColorService = (data) => {
  return httpService("/admin/colors", "post", data, "application/json");
};

export const editColorService = (colorId, data) => {
  return httpService(
    `/admin/colors/${colorId}`,
    "put",
    data,
    "application/json"
  );
};

export const deleteColorService = (colorId) => {
  return httpService(
    `/admin/colors/${colorId}`,
    "delete",
    null,
    "application/json"
  );
};
