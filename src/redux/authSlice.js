import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, role }, thunkAPI) => {
        try {
            const endpoint = role === 'admin' ? 'https://online-exam-portal-server.onrender.com/api/auth/admin/login' : 'https://online-exam-portal-server.onrender.com/api/auth/student/login';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            return { user: data.user, token: data.token, role };
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password, confirmPassword }, thunkAPI) => {
        try {
            const response = await fetch('https://online-exam-portal-server.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Signup failed');

            return { user: data.user, token: data.token, role: 'student' };
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    token: null,
    role: null,
    loading: null,
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