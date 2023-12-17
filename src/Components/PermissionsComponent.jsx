import React from "react";
import { useHasPermission } from "../Hooks/permissionsHook";
import { Navigate } from "react-router-dom";

const PermissionsComponent = ({ component, permissionTitle }) => {
  const hasPermission = useHasPermission(permissionTitle);
  return hasPermission ? component : <Navigate to={-1} />;
};
export default PermissionsComponent;
