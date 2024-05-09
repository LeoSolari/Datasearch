import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener usuarios
export const fetchUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get("http://localhost:4000/api/users");
  return response.data;
});

// Acción asincrónica para crear un nuevo usuario
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await axios.post(
      "http://localhost:4000/api/users",
      userData
    );
    return response.data;
  }
);

// Slice para el estado de los usuarios
export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
