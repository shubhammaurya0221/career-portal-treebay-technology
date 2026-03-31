import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobsAPI } from "./jobAPI";

// async action
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async () => {
    return await fetchJobsAPI();
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;