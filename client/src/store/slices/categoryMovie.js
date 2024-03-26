import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchCategoryMovies = createAsyncThunk(
    "categoryMovie/fetchCategoryMovies",
    async () => {
        const response = await fetch("/api/v1/admin/category-movie");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false
}

const categoryMovieSlice = createSlice({
    name: "categoryMovie",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategoryMovies.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCategoryMovies.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchCategoryMovies };
export default categoryMovieSlice.reducer;
    

