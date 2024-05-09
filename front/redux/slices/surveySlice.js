import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSurvey = createAsyncThunk("survey/getSurvey", async () => {
  const response = await axios.get("http://localhost:4000/api/surveys");
  return response.data;
});

// Acción asincrónica para obtener un pozo por su Survey_ID
export const fetchSurveyById = createAsyncThunk(
  "surveys/getSurveyById",
  async (surveyId) => {
    const response = await axios.get(
      `http://localhost:4000/api/surveys/${surveyId}`
    );
    return response.data;
  }
);

// Slice para el estado de los surveys
export const surveySlice = createSlice({
  name: "survey",
  initialState: {
    survey: [],
    singleSurvey: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurvey.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSurvey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.survey = action.payload;
      })
      .addCase(fetchSurvey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurveyById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSurveyById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleSurvey = action.payload;
      })
      .addCase(fetchSurveyById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default surveySlice.reducer;
