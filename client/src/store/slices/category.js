import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    async() => {
        const response = await fetch("/api/v1/admin/category");

        const data = await response.json();

        return data;
    }
);


const initialState = {
    listCategory: [],
    loading: false,
    error: null
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.listCategory = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export { fetchCategory };
export default categorySlice.reducer;