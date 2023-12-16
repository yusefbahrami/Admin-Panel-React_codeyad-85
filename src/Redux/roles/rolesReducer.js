import {
  RECIEVE_ROLES_ERROR,
  RECIEVE_ROLES_REQUEST,
  SEND_ROLES_REQUEST,
} from "./rolesType";

const initialState = {
  loading: false,
  roles: [],
  error: "",
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ROLES_REQUEST:
      return { ...state, loading: true };

    case RECIEVE_ROLES_REQUEST:
      return { loading: false, roles: action.payload, error: "" };
    case RECIEVE_ROLES_ERROR:
      return { loading: false, roles: [], error: action.payload };
    default:
      return state;
  }
};

export default rolesReducer;
