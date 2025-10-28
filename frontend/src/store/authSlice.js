import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios'; 

const initialState = {
  student: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

//  Async Thunks (Handling API calls) 
// 1. Thunk for the initial login
export const login = createAsyncThunk(
  'auth/login',
  async ({ referenceId, studentName }, { rejectWithValue }) => {
    try {
      const response = await api.post('/students/login', {
        referenceId,
        studentName,
      });
      // The student data is in response.data.data.student
      return response.data.data.student;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);

// 2. Thunk for checking if already logged in (using cookie)
export const checkLoggedIn = createAsyncThunk(
  'auth/checkLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await api.get('/students/me');
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Not authenticated');
    }
  }
);

// 3. Thunk for logging out
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

// The Auth Slice 
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  // This handles all the async thunk states
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload; // Set the student data
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Check Logged In
      .addCase(checkLoggedIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload; // Set the student data
      })
      .addCase(checkLoggedIn.rejected, (state) => {
        state.status = 'idle'; // Not 'failed', just 'idle'
        state.student = null;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.student = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        // Even if logout API fails, we clear the frontend state
        state.status = 'idle';
        state.student = null;
      });
  },
});

export default authSlice.reducer;

