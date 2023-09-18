import httpService from "./httpService";

export const getAllGurantiesService = () => {
  return httpService("/admin/guarantees", "get", null, "application/json");
};

export const addNewGuranteeService = (data) => {
  return httpService("/admin/guarantees", "post", data, "application/json");
};

export const editGuranteeService = (guranteeId, data) => {
  return httpService(
    `/admin/guarantees/${guranteeId}`,
    "put",
    data,
    "application/json"
  );
};

export const deleteGuranteeService = (guranteeId) => {
  return httpService(
    `/admin/guarantees/${guranteeId}`,
    "delete",
    null,
    "application/json"
  );
};
