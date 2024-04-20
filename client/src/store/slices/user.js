import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async () => {
        const response = await fetch("/api/v1/app/user");

        const data = await response.json();

        return data;
    }
);

const initialState = {
    listUser: [],
    isLogged: false,
    user: "",
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.isLogged = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isLogged = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.listUser = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});


export { fetchUsers };
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
