import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchTimes = createAsyncThunk(
    "timeTable/fetchTimes",
    async () => {
        const response = await fetch("/api/v1/admin/timetable");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false
}

const timeTableSlice = createSlice({
    name: "timeTable",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTimes.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTimes.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchTimes };
export default timeTableSlice.reducer;
    

