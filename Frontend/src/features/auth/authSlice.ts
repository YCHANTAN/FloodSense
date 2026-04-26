import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: {
    id: 'mock-123',
    email: 'resident@floodsense.dev',
    name: 'Cebu Resident',
  },
  token: 'mock-dev-token',
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setStatus: (state, action: PayloadAction<AuthState['status']>) => {
      state.status = action.payload;
    },
  },
});

export const { setCredentials, logout, setStatus } = authSlice.actions;
export default authSlice.reducer;
