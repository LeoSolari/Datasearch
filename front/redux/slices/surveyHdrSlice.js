import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSurveyHdr = createAsyncThunk(
  "surveyHdr/getSurveyHdr",
  async () => {
    const response = await axios.get("http://localhost:4000/api/surveyhdr");
    return response.data;
  }
);

export const fetchSurveyHdrById = createAsyncThunk(
  "surveyHdr/getSurveyHdrById",
  async (surveyId) => {
    const response = await axios.get(`http://localhost:4000/api/surveyhdr/${surveyId}`);
    return response.data;
  }
);

export const surveyHdrSlice = createSlice({
  name: "surveyHdr",
  initialState: {
    surveyHdr: [],
    singleSurveyHdr: [],
    statusHdr: "idle",
    errorHdr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyHdr.pending, (state) => {
        state.statusHdr = "loading";
        state.errorHdr = null; // Limpiar el error cuando se inicia la carga
      })
      .addCase(fetchSurveyHdr.fulfilled, (state, action) => {
        state.statusHdr = "succeeded";
        state.surveyHdr = action.payload;
        state.errorHdr = null; // Limpiar el error cuando la carga tiene éxito
      })
      .addCase(fetchSurveyHdr.rejected, (state, action) => {
        state.statusHdr = "failed";
        state.errorHdr = action.error.message; // Capturar el mensaje de error en caso de fallo
      })
      .addCase(fetchSurveyHdrById.pending, (state) => {
        state.statusHdr = "loading";
        state.errorHdr = null; // Limpiar el error cuando se inicia la carga por ID
      })
      .addCase(fetchSurveyHdrById.fulfilled, (state, action) => {
        state.statusHdr = "succeeded";
        state.singleSurveyHdr = action.payload;
        state.errorHdr = null; // Limpiar el error cuando la carga por ID tiene éxito
      })
      .addCase(fetchSurveyHdrById.rejected, (state, action) => {
        state.statusHdr = "failed";
        state.errorHdr = action.error.message; // Capturar el mensaje de error en caso de fallo por ID
      });
  },
});

export default surveyHdrSlice.reducer;
