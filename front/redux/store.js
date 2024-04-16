import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import wellSlice from "./slices/wellSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    wells: wellSlice,
  },
});

export default store;
