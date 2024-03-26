import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchMovieTheaters = createAsyncThunk(
    "movieTheater/fetchMovieTheaters",
    async () => {
        const response = await fetch("/api/v1/admin/movie-theater");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false
}

const movieTheaterSlice = createSlice({
    name: "movieTheater",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieTheaters.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMovieTheaters.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchMovieTheaters.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchMovieTheaters };
export default movieTheaterSlice.reducer;
    

