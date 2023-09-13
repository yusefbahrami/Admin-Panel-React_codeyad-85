import httpService from "./httpService";

export const getCategoriesService = (id = null) => {
  return httpService(`/admin/categories${id ? `?parent=${id}` : ""}`, "get");
};

export const createNewCategoryService = (data) => {
  let contentType = "application/json";
  if (data.image) {
    let formdata = new FormData();
    formdata.append("parent_id", data.parent_id);
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("image", data.image);
    formdata.append("is_active", data.is_active);
    formdata.append("show_in_menu", data.show_in_menu);
    contentType = "multipart/form-data";
    data = formdata;
  }
  return httpService("/admin/categories", "post", data, contentType);
};
