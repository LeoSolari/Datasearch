import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import wellSlice from "./slices/wellSlice";
import surveySlice from "./slices/surveySlice";
import archivoSlice from "./slices/archivoSlice";
import { logCurveSlice } from "./slices/logcurveSlice";
import languageSlice from "./slices/languageSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    wells: wellSlice,
    survey: surveySlice,
    logCurve: logCurveSlice.reducer,
    archivo: archivoSlice,
    language : languageSlice
  },
});

export default store;
