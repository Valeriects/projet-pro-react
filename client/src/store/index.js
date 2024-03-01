import { configureStore } from '@reduxjs/toolkit';

import moviesReducer from "./slices/movie";
import userReducer from "./slices/user";

const store = configureStore({
    reducer: {
        movie: moviesReducer,
        user: userReducer,

    }

});

export {store};