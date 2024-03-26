import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchMediaMovie = createAsyncThunk(
    "mediaMovie/fetchMediaMovie",
    async() => {
        const response = await fetch("/api/v1/admin/movie-media");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    listMediaMovie: [],
    loading: false,
    error: null
}

const mediaMovieSlice = createSlice({
    name: "mediaMovie",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchMediaMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMediaMovie.fulfilled, (state, action) => {
                state.listMediaMovie = action.payload;
                state.loading = false;
            })
            .addCase(fetchMediaMovie.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export { fetchMediaMovie };
export default mediaMovieSlice.reducer;