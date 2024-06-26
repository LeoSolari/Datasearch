import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import wellSlice from "./slices/wellSlice";
import surveySlice from "./slices/surveySlice";
import archivoSlice from "./slices/archivoSlice";
import { logCurveSlice } from "./slices/logcurveSlice";
import languageSlice from "./slices/languageSlice";
import surveyHdrSlice from "./slices/surveyHdrSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    wells: wellSlice,
    survey: surveySlice,
    logCurve: logCurveSlice.reducer,
    archivo: archivoSlice,
    language : languageSlice,
    surveyHdr: surveyHdrSlice
  },
});

export default store;
