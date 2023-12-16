import { getUserService } from "../../Services/auth";
import {
  RECIEVE_USER_ERROR,
  RECIEVE_USER_REQUEST,
  SEND_USER_REQUEST,
} from "./userType";

export const sendUserRequest = () => {
  return {
    type: SEND_USER_REQUEST,
  };
};

export const receiveUserRequest = (data) => {
  return {
    type: RECIEVE_USER_REQUEST,
    payload: data,
  };
};

export const receiveUserError = (error) => {
  return {
    type: RECIEVE_USER_ERROR,
    payload: error,
  };
};

export const getUserActionRedux = () => {
  return (dispatch, state) => {
    dispatch(sendUserRequest());
    getUserService()
      .then((res) => {
        receiveUserRequest(res.data.roles);
      })
      .catch((error) => {
        receiveUserError(error.message);
      });
  };
};
