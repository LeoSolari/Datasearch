import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener pozos
export const fetchWells = createAsyncThunk("wells/getWells", async () => {
  const response = await axios.get(
    "https://datasearch-server-1.onrender.com/api/wells"
  );
  return response.data;
});

// Acción asincrónica para obtener un pozo por su WELL_ID
export const fetchWellById = createAsyncThunk(
  "wells/getWellById",
  async (wellId) => {
    const response = await axios.get(
      `https://datasearch-server-1.onrender.com/api/wells/${wellId}`
    );
    return response.data;
  }
);

// Slice para el estado de los pozos
export const wellSlice = createSlice({
  name: "wells",
  initialState: {
    wells: [],
    singleWell: null, // Agrega una propiedad para almacenar un pozo único
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWells.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWells.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wells = action.payload;
      })
      .addCase(fetchWells.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchWellById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWellById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleWell = action.payload;
      })
      .addCase(fetchWellById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default wellSlice.reducer;
