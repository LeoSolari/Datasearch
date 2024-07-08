import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener todos los PICKS
export const fetchPicks = createAsyncThunk("picks/getPicks", async () => {
  const response = await axios.get("http://localhost:4000/api/picks");
  return response.data;
});

// Acción asincrónica para obtener un PICK por su ID
export const fetchPickById = createAsyncThunk(
  "picks/getPickById",
  async (pickId) => {
    const response = await axios.get(`http://localhost:4000/api/picks/${pickId}`);
    return response.data;
  }
);

export const picksSlice = createSlice({
  name: "picks",
  initialState: {
    picks: [],
    singlePick: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPicks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPicks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.picks = action.payload;
      })
      .addCase(fetchPicks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPickById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPickById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singlePick = action.payload;
      })
      .addCase(fetchPickById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default picksSlice.reducer;
