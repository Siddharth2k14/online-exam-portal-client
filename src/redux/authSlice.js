/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server_url = import.meta.env.VITE_SERVER_URL;
console.log(server_url);

const Base_url = `${server_url}/api/auth/`;

const localStorage = window.localStorage;

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      // Use a single login endpoint - let backend determine role from email
      const endpoint = `${Base_url}login`;
      const response = await axios.post(endpoint, { email, password });
      return {
        user: response.data.user,
        token: response.data.token,
        role: response.data.role
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password, confirmPassword, phoneNumber }, thunkAPI) => {
    try {
      const response = await axios.post(`${Base_url}signup`, {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber, // Added phoneNumber parameter
      });
      return {
        user: response.data.user,
        token: response.data.token,
        role: response.data.role,
        phoneNumber: response.data.phoneNumber,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Signup failed'
      );
    }
  }
);

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  role: role || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;
      localStorage.clear();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;