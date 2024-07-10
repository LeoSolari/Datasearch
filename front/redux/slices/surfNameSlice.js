import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener todos los SURF_NAMES
export const fetchSurfNames = createAsyncThunk("surfNames/getSurfNames", async () => {
  const response = await axios.get("http://localhost:4000/api/surfName/");
  return response.data;
});

// Acción asincrónica para obtener un SURF_NAME por su PICK_SURF_ID
export const fetchSurfNameBySurfId = createAsyncThunk(
  "surfNames/getSurfNameBySurfId",
  async (pickSurfId) => {
    const response = await axios.get(`http://localhost:4000/api/surfName/${pickSurfId}`);
    return response.data;
  }
);

// Definición inicial del slice de surfNames
export const surfNameSlice = createSlice({
  name: "surfNames",
  initialState: {
    surfNames: [],          // Almacenará todos los surf names obtenidos
    surfNamesMap: {},       // Mapa para almacenar surf names por PICK_SURF_ID
    status: "idle",         // Estado inicial
    error: null,            // Manejo de errores
  },
  reducers: {
    updateSurfNamesMap: (state, action) => {
      state.surfNamesMap = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurfNames.pending, (state) => {
        state.status = "loading";  // Cambia el estado a cargando
      })
      .addCase(fetchSurfNames.fulfilled, (state, action) => {
        state.status = "succeeded";     // Cambia el estado a exitoso
        state.surfNames = action.payload;   // Actualiza la lista de surf names
      })
      .addCase(fetchSurfNames.rejected, (state, action) => {
        state.status = "failed";        // Cambia el estado a fallido
        state.error = action.error.message;  // Guarda el mensaje de error
      })
      .addCase(fetchSurfNameBySurfId.pending, (state) => {
        state.status = "loading";  // Cambia el estado a cargando
      })
      .addCase(fetchSurfNameBySurfId.fulfilled, (state, action) => {
        state.status = "succeeded";        // Cambia el estado a exitoso
        state.surfNamesMap[action.payload.PICK_SURF_ID] = action.payload.LOCAL_NAME; // Guarda el surf name específico en el mapa por PICK_SURF_ID
      })
      .addCase(fetchSurfNameBySurfId.rejected, (state, action) => {
        state.status = "failed";           // Cambia el estado a fallido
        state.error = action.error.message;  // Guarda el mensaje de error
      });
  },
});

export const { updateSurfNamesMap } = surfNameSlice.actions;

export default surfNameSlice.reducer;
