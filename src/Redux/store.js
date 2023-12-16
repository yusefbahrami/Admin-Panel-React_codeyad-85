// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from "./roles/rolesReducer";

// const store = createStore(rolesReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: {
    rolesReducer,
  },
  //   middleware:[thunk]
});

export default store;
