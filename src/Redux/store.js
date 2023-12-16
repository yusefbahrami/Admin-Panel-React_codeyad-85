// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";

// const store = createStore(rolesReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: {
    userReducer,
  },
  //   middleware:[thunk]
});

export default store;
