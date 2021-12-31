import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import modalReducer from "./features/modal";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export default store;
