import axios from "axios";
import config from "./config.json";
import { Alert } from "../Utils/alerts";

// export const apiPath = config.offlinePath;
export const apiPath = config.onlinePath;

axios.interceptors.response.use(
  (res) => {
    if (res.status != 200 && res.status != 201) {
      if (typeof res.data == "object") {
        let message = "";
        for (const key in res.data) {
          message = message + `${key} : ${res.data[key]}`;
        }
        res.data.message = message;
      }
      Alert("warning", "مشکل!", res.data.message);
    }
    return res;
  },
  (error) => {
    Alert("error", "مشکلی رخ داده است...!", error.response.status);
    return Promise.reject(error);
  }
);

const httpService = (url, method, data = null, ContentType) => {
  const tokenInfo = JSON.parse(localStorage.getItem("LoginToken"));
  return axios({
    url: `${apiPath}/api${url}`,
    method,
    data,
    headers: {
      Authorization: tokenInfo ? `Bearer ${tokenInfo.token}` : null,
      "Content-Type": ContentType,
    },
  });
};
export default httpService;
