import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://online-exam-portal-server.onrender.com/api/auth';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, role }, thunkAPI) => {
    try {
      const endpoint = `${BASE_URL}/${role}/login`;
      const response = await axios.post(endpoint, { email, password });
      return { user: response.data.user, token: response.data.token, role: response.data.role };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      return {
        user: response.data.user,
        token: response.data.token,
        role: 'student',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Signup failed'
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  role: null,
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
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;