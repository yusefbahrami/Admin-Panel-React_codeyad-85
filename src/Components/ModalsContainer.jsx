import React, { Fragment } from "react";
import { createPortal } from "react-dom";

const ModalsContainer = ({ children }) => {
  return createPortal(
    <Fragment>{children}</Fragment>,
    document.getElementById("modals-root")
  );
};
export default ModalsContainer;
