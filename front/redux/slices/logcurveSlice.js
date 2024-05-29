import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener pozos
export const fetchlogCurve = createAsyncThunk(
  "logCurve/getLogCurve",
  async () => {
    const response = await axios.get("http://localhost:4000/api/logCurve");
    return response.data;
  }
);

// Acción asincrónica para obtener un pozo por su LOG_CURVE_ID
export const fetchLogCurveById = createAsyncThunk(
  "logcurve/getLogCurveById",
  async (logId) => {
    const response = await axios.get(
      `http://localhost:4000/api/logCurve/${logId}`
    );
    return response.data;
  }
);

// Slice para el estado de los pozos
export const logCurveSlice = createSlice({
  name: "logCurve",
  initialState: {
    logs: [],
    singleLog: null, 
    fetchLogsStatus: "idle",
    fetchSingleLogStatus: "idle",
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default logCurveSlice.reducer;
