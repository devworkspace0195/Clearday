import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoredUser {
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: StoredUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<StoredUser>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    setLoggedOut: state => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const { setLoggedIn, setLoggedOut, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
