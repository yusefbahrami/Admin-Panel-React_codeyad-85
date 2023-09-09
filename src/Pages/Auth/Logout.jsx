import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../../Utils/alerts";

const Logout = () => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("LoginToken"));
    axios
      .get("https://ecomadminapi.azhadev.ir/api/auth/logout", {
        headers: { Authorization: `Bearer ${loginToken.token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.removeItem("LoginToken");
        } else {
          Alert("error", "متاسفم...!", res.data.message);
        }
        setloading(false);
      })
      .catch((error) => {
        // Alert("error", "متاسفم...!", error.message);
        setloading(false);
      });
  }, []);
  return (
    <Fragment>
      {loading ? (
        <h1 className="text-center">لطفا صبر کنید...</h1>
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </Fragment>
  );
};
export default Logout;
