import React from "react";
import { NavLink } from "react-router-dom";
import { useHasPermission } from "../../../../Hooks/permissionsHook";

const SidebarItem = ({ title, icon, customClass, targetPath, pTitle }) => {
  const hasPermmission = useHasPermission(pTitle);
  return (
    hasPermmission && (
      <NavLink
        to={targetPath}
        className={`py-1 text-start pe-4 sidebar_menu_item sidebar_item ${customClass}`}
      >
        <i className={`ms-3 icon ${icon} text-light`}></i>
        <span className="hiddenable no_wrap font_08">{title}</span>
      </NavLink>
    )
  );
};
export default SidebarItem;
