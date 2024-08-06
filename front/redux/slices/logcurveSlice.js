import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener todas las log curves
export const fetchlogCurve = createAsyncThunk(
  "logCurve/getLogCurve",
  async () => {
    const response = await axios.get("http://localhost:4000/api/logCurve");
    return response.data;
  }
);

// Acción asincrónica para obtener una log curve por su LOG_CURVE_ID
export const fetchLogCurveById = createAsyncThunk(
  "logcurve/getLogCurveById",
  async (logId) => {
    const response = await axios.get(
      `http://localhost:4000/api/logCurve/${logId}`
    );
    return response.data;
  }
);

// Acción asincrónica para buscar log curves por LOG_CRV_NAME
export const searchLogCurveByName = createAsyncThunk(
  "logcurve/searchLogCurveByName",
  async (name) => {
    const response = await axios.get(
      `http://localhost:4000/api/logCurve/name/${name}`
    );
    return response.data;
  }
);

// Slice para el estado de las log curves
export const logCurveSlice = createSlice({
  name: "logCurve",
  initialState: {
    logs: [],
    singleLog: null,
    headerlogs: [],
    fetchLogsStatus: "idle",
    fetchSingleLogStatus: "idle",
    searchStatus: "idle",
    error: null,
  },
  reducers: {
    clearLogCurveData: (state) => {
      state.headerlogs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Para fetchlogCurve
      .addCase(fetchlogCurve.pending, (state) => {
        state.fetchLogsStatus = "loading";
      })
      .addCase(fetchlogCurve.fulfilled, (state, action) => {
        state.fetchLogsStatus = "succeeded";
        state.logs = action.payload;
      })
      .addCase(fetchlogCurve.rejected, (state, action) => {
        state.fetchLogsStatus = "failed";
        state.error = action.error.message;
      })
      // Para fetchLogCurveById
      .addCase(fetchLogCurveById.pending, (state) => {
        state.fetchSingleLogStatus = "loading";
      })
      .addCase(fetchLogCurveById.fulfilled, (state, action) => {
        state.fetchSingleLogStatus = "succeeded";
        state.singleLog = action.payload;
      })
      .addCase(fetchLogCurveById.rejected, (state, action) => {
        state.fetchSingleLogStatus = "failed";
        state.error = action.error.message;
      })
      // Para searchLogCurveByName
      .addCase(searchLogCurveByName.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(searchLogCurveByName.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.headerlogs = action.payload;
      })
      .addCase(searchLogCurveByName.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearLogCurveData } = logCurveSlice.actions;

export default logCurveSlice.reducer;
