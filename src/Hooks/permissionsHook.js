import { useSelector } from "react-redux";

export const useHasPermission = (permissionTitle) => {
  const user = useSelector((state) => state.userReducer.data);
  const roles = user.roles;
  let permissions = [];
  for (const role of roles) {
    permissions = [...permissions, ...role.permissions];
  }

  const isAdmin = roles.findIndex((r) => r.title == "admin") > -1;
  return (
    isAdmin ||
    (typeof permissionTitle === "object"
      ? hasOneOfPermissions(permissions, permissionTitle)
      : permissions.findIndex((p) => p.title.includes(permissionTitle)) > -1)
  );
};

const hasOneOfPermissions = (permissions, permissionTitles) => {
  for (const pTitle of permissionTitles) {
    if (permissions.findIndex((p) => p.title.includes(pTitle)) > -1) {
      return true;
    }
  }
  return false;
};
