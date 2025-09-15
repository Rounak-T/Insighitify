import { createSlice , createAsyncThunk  } from '@reduxjs/toolkit';

// METHOD TO FETCH SUBS
export const fetchSubs = createAsyncThunk(
  "subs/fetchSubs",
  async (token) => {
    const res = await fetch("http://localhost:5000/dashboard/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const data = await res.json();
  
    return data;
    }
    else {
        throw new Error("Failed to fetch subscriptions");
    }
  }
);

//CREATE SIMILAR METHOD FOR UPDATE AND DELETE TOO - Create another function for update like fetchsubs write its logic then directly addcases directly inside extrareducers

export const DataSlice = createSlice({
  name: 'subs',
  initialState: {
    list: [],
    status: "idle"
  },
  reducers: {},
  extraReducers: (actionHandler) => {
    actionHandler
      .addCase(fetchSubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubs.fulfilled, (state, action) => {
        state.status = "succeeded";
      
        state.list = action.payload;
      })
      .addCase(fetchSubs.rejected, (state) => {
        state.status = "failed";
      });
  }
})

// export const { addSub, deleteSub } = DataSlice.actions

export default DataSlice.reducer