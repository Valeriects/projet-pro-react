import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchSessions = createAsyncThunk(
    "session/fetchSessions",
    async () => {
        const response = await fetch("/api/v1/admin/session-movie");
        const data = await response.json();
        return data;
    }
);

const fetchCountSeats = createAsyncThunk(
    "session/fetchCountSeats",
    async (sessionId) => {
        const res = await fetch(`/api/v1/app/session/${sessionId}`);
        const data = await res.json();
        return data;
    }
);

const initialState = {
    list: [],
    listCount: [],
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
            .addCase(fetchCountSeats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCountSeats.fulfilled, (state, action) => {
                state.listCount = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCountSeats.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchSessions, fetchCountSeats };
export default sessionSlice.reducer;
    

