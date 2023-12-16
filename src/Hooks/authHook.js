import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receiveUserRequest } from "../Redux/user/userActions";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("LoginToken"));
    if (loginToken) {
      axios
        .get("https://ecomadminapi.azhadev.ir/api/auth/user", {
          headers: { Authorization: `Bearer ${loginToken.token}` },
        })
        .then((res) => {
          setIsLogin(res.status == 200 ? true : false);
          dispatch(receiveUserRequest(res.data));
          setLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("LoginToken");
          // dispatch(receiveRolesError(err.message));
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
