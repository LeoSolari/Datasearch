// wellPicksSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  picks: [],
  loading: false,
  error: null
};

// Acción asincrónica para cargar todos los picks
export const fetchAllPicks = createAsyncThunk(
  'wellPicks/fetchAllPicks',
  async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/combinedPicksData'); // Cambia esta URL si es necesario
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const wellPicksSlice = createSlice({
  name: 'wellPicks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPicks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPicks.fulfilled, (state, action) => {
        state.loading = false;
        state.picks = action.payload;
      })
      .addCase(fetchAllPicks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default wellPicksSlice.reducer;
