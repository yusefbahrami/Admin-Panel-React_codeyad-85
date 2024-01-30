import React from "react";
import { useHasPermission } from "../../../../Hooks/permissionsHook";

const SidebarGroupTitle = ({ title, pTitles }) => {
  const hasPermission = useHasPermission(pTitles);
  return (
    hasPermission && (
      <div className="py-1 text-start d-flex justify-content-center no_pointer no_hover sidebar_item">
        <span className="hiddenable no_wrap group_sidebar_title">{title}</span>
      </div>
    )
  );
};
export default SidebarGroupTitle;
