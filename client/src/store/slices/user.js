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
    id: '',
    // firstname: "",
    resUser: {
        prenom: "",
        roleUser: "",
    },
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.isLogged = true;
            console.log("action: ", action.payload);
         
            // state.resUser = action.payload;
            // state.id = action.payload.id;
            // console.log(payload);
            // state.resUser.prenom = action.payload.firstname;
            // state.roles_id = action.payload.roles_id;
            // state.roleUser = action.payload.roles_id;
        },
        logout(state) {
            state.isLogged = false;
            // state.email = "";
            // state.id = "";
            // state.firstname = "";
            // state.roles_id = "";

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
