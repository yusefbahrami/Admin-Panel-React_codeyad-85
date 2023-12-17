import { useSelector } from "react-redux";

export const useHasPermission = (permissionTitle) => {
  const user = useSelector((state) => state.userReducer.data);
  const roles = user.roles;
  let permissions = [];
  for (const role of roles) {
    permissions = [...permissions, role];
  }

  return permissions.findIndex((p) => p.title.includes(permissionTitle)) > -1;
};
