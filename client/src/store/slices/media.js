import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchMedia = createAsyncThunk(
    "media/fetchMedia",
    async() => {
        const response = await fetch("/api/v1/admin/media");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    listMedia: [],
    loading: false,
    error: null
}

const mediaSlice = createSlice({
    name: "media",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedia.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMedia.fulfilled, (state, action) => {
                state.listMedia = action.payload;
                state.loading = false;
            })
            .addCase(fetchMedia.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export { fetchMedia };
export default mediaSlice.reducer;