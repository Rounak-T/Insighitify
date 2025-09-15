import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
initialState: {
  name: "",
  email: "",
  income: 0,
  expense: 0,
  savingsgoal: 0,
  monthlyStats: [],
},
  reducers: {
    userInfo: (state , action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.income = action.payload.income;
        state.expense = action.payload.expense;
        state.savingsgoal = action.payload.savingsgoal;
        state.monthlyStats = action.payload.monthlyStats;
    },
  },
})

export const { userInfo } = UserSlice.actions

export default UserSlice.reducer