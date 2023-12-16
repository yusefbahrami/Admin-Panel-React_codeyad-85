import {
  RECIEVE_USER_ERROR,
  RECIEVE_USER_REQUEST,
  SEND_USER_REQUEST,
} from "./userType";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIEVE_USER_ERROR:
      return { ...state, loading: true };

    case RECIEVE_USER_REQUEST:
      return { loading: false, data: action.payload, error: "" };
    case SEND_USER_REQUEST:
      return { loading: false, data: [], error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
