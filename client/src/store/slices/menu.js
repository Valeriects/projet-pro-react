import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isMenuOpen: false,
    isUserOpen: false,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
            state.isUserOpen = false;
        },
        toggleMenuMember: (state) => {
            state.isUserOpen = !state.isUserOpen;
            state.isMenuOpen = false;
        },
        closeMenu: (state) => {
            state.isUserOpen = false;
            state.isMenuOpen = false;
        },
    },
});

export const {toggleMenu, toggleMenuMember, closeMenu} = menuSlice.actions;
export default menuSlice.reducer;