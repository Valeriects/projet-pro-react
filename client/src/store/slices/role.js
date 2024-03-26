import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchRoles = createAsyncThunk(
    "role/fetchRoles",
    async () => {
        const response = await fetch("/api/v1/admin/role");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false
}

const roleSlice = createSlice({
    name: "role",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.isError = action.error.message;
                state.isLoading = false;
            })
    }
});

export { fetchRoles };
export default roleSlice.reducer;
    

