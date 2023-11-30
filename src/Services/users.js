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

export const getSinglrRoleService = (roleId) => {
  return httpService(`/admin/roles/${roleId}`, "get");
};

export const getAllUsersService = () => {
  return httpService("/admin/users", "get");
};

export const getAllPaginatedUsersService = (page, countOnPage, searchChar) => {
  return httpService(
    `/admin/users?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get"
  );
};

export const editRoleService = (roleId, data) => {
  return httpService(`/admin/roles/${roleId}`, "put", data);
};

export const deleteRoleService = (roleId) => {
  return httpService(`/admin/roles/${roleId}`, "delete");
};

export const editRolePermissionsService = (roleId, data) => {
  return httpService(`/admin/roles/${roleId}/permissions`, "put", data);
};
