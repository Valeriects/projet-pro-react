import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchMovies = createAsyncThunk(
    "movie/fetchMovies",
    async () => {
        const response = await fetch("/api/v1/app/movie");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchMovies };
export default movieSlice.reducer;
    

