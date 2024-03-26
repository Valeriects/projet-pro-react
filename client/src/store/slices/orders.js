import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async () => {
        const response = await fetch("/api/v1/admin/order");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchOrders };
export default orderSlice.reducer;
    

