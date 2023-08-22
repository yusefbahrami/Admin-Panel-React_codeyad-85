import React from "react";

const Avatar = (props) => {
  const { name, imagePath, alt } = props;
  return (
    <div className="pt-1 pb-2 d-flex flex-column avatar_li position-relative sidebar_item">
      <span className="avatar_box">
        <img className="w-100 rounded-circle" src={imagePath} alt={alt} />
      </span>
      <div className="sidebar_avatar_name text-center hiddenable">{name}</div>
    </div>
  );
};
export default Avatar;
