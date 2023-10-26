import httpService from "./httpService";

export const getAllPermissionsService = () => {
  return httpService("/admin/permissions", "get", null, "application/json");
};

export const getAllRolesService = () => {
  return httpService("/admin/roles", "get", null, "application/json");
};

export const addNewRoleService = (data) => {
  return httpService("/admin/roles", "post", data, "application/json");
};
