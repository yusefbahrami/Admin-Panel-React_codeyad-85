import axios from "axios";
import { useEffect, useState } from "react";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("LoginToken"));
    if (loginToken) {
      axios
        .get("https://ecomadminapi.azhadev.ir/api/auth/user", {
          headers: { Authorization: `Bearer ${loginToken.token}` },
        })
        .then((res) => {
          // console.log(res);
          setIsLogin(res.status == 200 ? true : false);
          setLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("LoginToken");
          setIsLogin(false);
          setLoading(false);
        });
    } else {
      setIsLogin(false);
      setLoading(false);
    }
  }, []);

  return [loading, isLogin];
};
