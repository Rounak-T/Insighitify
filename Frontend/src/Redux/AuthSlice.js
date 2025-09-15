import { createSlice } from '@reduxjs/toolkit';

const savedToken = localStorage.getItem("token");

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {value: savedToken || null},
  reducers: {
    login: (state , action) => {
        state.value = action.payload;
        localStorage.setItem("token",action.payload);
    },
    logout: (state) => {
        state.value = null;
        localStorage.removeItem("token"); 
    }
  },
})

export const { login , logout } = AuthSlice.actions
export default AuthSlice.reducer