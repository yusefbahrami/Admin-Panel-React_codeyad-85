import httpService from "./httpService";

export const getAllBrandsService = () => {
  return httpService("/admin/brands", "get", null, "application/json");
};

export const addNewBrandService = (data) => {
  let contentType = "application/json";
  if (data.logo) {
    let formdata = new FormData();
    formdata.append("original_name", data.original_name);
    formdata.append("persian_name", data.persian_name);
    formdata.append("descriptions", data.descriptions);
    formdata.append("logo", data.logo);
    contentType = "multipart/form-data";
    data = formdata;
  }
  return httpService("/admin/brands", "post", data, contentType);
};
