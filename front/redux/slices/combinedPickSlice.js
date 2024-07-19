// combinedPicksSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Si estás usando axios para realizar llamadas HTTP

const initialState = {
  picks: [],
  loading: false,
  error: null
};

// Acción asincrónica para cargar los picks combinados por WELL_ID
export const fetchCombinedPicks = createAsyncThunk(
  'combinedPicks/fetchCombinedPicks',
  async (wellId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/combinedPicksByWellId/${wellId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const combinedPicksSlice = createSlice({
  name: 'combinedPicks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCombinedPicks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCombinedPicks.fulfilled, (state, action) => {
        state.loading = false;
        state.picks = action.payload;
      })
      .addCase(fetchCombinedPicks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default combinedPicksSlice.reducer;
