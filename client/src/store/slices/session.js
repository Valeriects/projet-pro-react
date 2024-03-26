import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchSessions = createAsyncThunk(
    "session/fetchSessions",
    async () => {
        const response = await fetch("/api/v1/admin/session-movie");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false
}

const sessionSlice = createSlice({
    name: "session",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSessions.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchSessions.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchSessions };
export default sessionSlice.reducer;
    

