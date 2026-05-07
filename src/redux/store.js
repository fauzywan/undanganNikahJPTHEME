import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./slices/configSlice";
import guestReducer from "./slices/guestSlice";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    config: configReducer,
    guest: guestReducer,
    auth: authReducer
  },
});
