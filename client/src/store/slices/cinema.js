import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchCinema = createAsyncThunk(
    "cinema/fetchCinema",
    async() => {
        const response = await fetch("/api/v1/app/cinema");

        const data = await response.json();

        return data;
    }
);

const initialState = {
    listCine: [],
    loading: false,
    error: null
}

const cinemaSlice = createSlice({
    name: "cinema",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCinema.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCinema.fulfilled, (state, action) => {
                state.listCine = action.payload;
                state.loading = false;
            })
            .addCase(fetchCinema.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export { fetchCinema };
export default cinemaSlice.reducer;