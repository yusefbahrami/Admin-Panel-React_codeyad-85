import React from "react";
import { Link } from "react-router-dom";

const AddButtonLink = ({ href }) => {
  return (
    <Link
      to={href}
      className="btn btn-success d-flex justify-content-center align-items-center"
    >
      <i className="fas fa-plus text-light"></i>
    </Link>
  );
};
export default AddButtonLink;
