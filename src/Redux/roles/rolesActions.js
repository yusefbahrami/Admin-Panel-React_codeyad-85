import { getUserService } from "../../Services/auth";
import {
  RECIEVE_ROLES_ERROR,
  RECIEVE_ROLES_REQUEST,
  SEND_ROLES_REQUEST,
} from "./rolesType";

export const sendRolesRequest = () => {
  return {
    type: SEND_ROLES_REQUEST,
  };
};

export const receiveRolesRequest = (data) => {
  return {
    type: RECIEVE_ROLES_REQUEST,
    payload: data,
  };
};

export const receiveRolesError = (error) => {
  return {
    type: RECIEVE_ROLES_ERROR,
    payload: error,
  };
};

export const getRolesActionRedux = () => {
  return (dispatch, state) => {
    dispatch(sendRolesRequest());
    getUserService()
      .then((res) => {
        receiveRolesRequest(res.data.roles);
      })
      .catch((error) => {
        receiveRolesError(error.message);
      });
  };
};
