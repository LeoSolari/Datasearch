import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener una encuesta por nombre y wellId
export const fetchSurveyByNameAndWellId = createAsyncThunk(
  'survey/fetchSurveyByNameAndWellId',
  async ({ surveyName, wellId }) => {
    const response = await axios.get(`http://localhost:4000/api/surveys/${encodeURIComponent(surveyName)}/${encodeURIComponent(wellId)}`);
    return response.data;
  }
);

// Otras acciones asincrónicas
export const fetchSurvey = createAsyncThunk("survey/getSurvey", async () => {
  const response = await axios.get("http://localhost:4000/api/surveys");
  return response.data;
});

export const fetchSurveyById = createAsyncThunk(
  "surveys/getSurveyById",
  async (surveyId) => {
    const response = await axios.get(`http://localhost:4000/api/surveys/id/${surveyId}`);
    return response.data;
  }
);

export const fetchSurveyByName = createAsyncThunk(
  "surveys/getSurveyByName",
  async (surveyName) => {
    const response = await axios.get(`http://localhost:4000/api/surveys/name/${encodeURIComponent(surveyName)}`);
    return response.data;
  }
);

export const fetchSurveyByWellId = createAsyncThunk(
  "surveys/getSurveyByWellId",
  async (wellId) => {
    const response = await axios.get(`http://localhost:4000/api/surveys/well/${wellId}`);
    return response.data;
  }
);

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
      })
      .addCase(fetchSurveyByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSurveyByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleSurvey = action.payload;
      })
      .addCase(fetchSurveyByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurveyByWellId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSurveyByWellId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleSurvey = action.payload;
      })
      .addCase(fetchSurveyByWellId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurveyByNameAndWellId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSurveyByNameAndWellId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleSurvey = action.payload;
      })
      .addCase(fetchSurveyByNameAndWellId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default surveySlice.reducer;
