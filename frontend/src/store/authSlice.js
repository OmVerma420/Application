// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const initialState = {
  student: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// --- 1. Login Thunk ---
export const login = createAsyncThunk(
  'auth/login',
  async ({ referenceId, studentName }, { rejectWithValue }) => {
    try {
      const response = await api.post('/students/login', { referenceId, studentName });
      return response.data?.data?.student;
    } catch (error) {
      // safer error handling
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Login failed'
      );
    }
  }
);

// --- 2. Check if Logged In (using cookie) ---
export const checkLoggedIn = createAsyncThunk(
  'auth/checkLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/students/me');
      return response.data?.data;
    } catch (error) {
      return rejectWithValue('Not authenticated');
    }
  }
);

// --- 3. Logout Thunk ---
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/students/logout');
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

// --- 4. The Auth Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.student = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- LOGIN ---
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- CHECK LOGGED IN ---
      .addCase(checkLoggedIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(checkLoggedIn.rejected, (state) => {
        state.status = 'idle';
        state.student = null;
      })

      // --- LOGOUT ---
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.student = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'idle';
        state.student = null;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
