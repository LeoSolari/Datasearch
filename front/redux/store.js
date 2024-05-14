import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import wellSlice from "./slices/wellSlice";
import surveySlice from "./slices/surveySlice";
import archivoSlice from "./slices/archivoSlice";
import { logCurveSlice } from "./slices/logcurveSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    wells: wellSlice,
    survey: surveySlice,
    logCurve: logCurveSlice.reducer,
    archivo: archivoSlice,
  },
});

export default store;
