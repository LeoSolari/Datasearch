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

// Acción asincrónica para obtener un pozo por su WELL_ID
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
    singleLog: [], // Agrega una propiedad para almacenar un pozo único
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchlogCurve.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchlogCurve.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs = action.payload;
      })
      .addCase(fetchlogCurve.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLogCurveById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogCurveById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleLog = action.payload;
      })
      .addCase(fetchLogCurveById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default logCurveSlice.reducer;
