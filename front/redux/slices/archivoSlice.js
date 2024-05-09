import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArchivos = createAsyncThunk(
  "archivos/getArchivos",
  async () => {
    const response = await axios.get("http://localhost:4000/api/archivos");
    return response.data;
  }
);

// Slice para el estado de los surveys
export const archivoSlice = createSlice({
  name: "archivo",
  initialState: {
    archivo: [],
    singleArchivo: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchivos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArchivos.fulfilled, (state, action) => {
        console.log("Estado actualizado:", action.payload);
        state.status = "succeeded";
        state.archivo = action.payload;
      })
      .addCase(fetchArchivos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default archivoSlice.reducer;
