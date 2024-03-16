import { configureStore } from '@reduxjs/toolkit';

import moviesReducer from "./slices/movie";
import userReducer from "./slices/user";
import categoryReducer from "./slices/category";

const store = configureStore({
    reducer: {
        movie: moviesReducer,
        user: userReducer,
        category: categoryReducer,

    }

});

export {store};