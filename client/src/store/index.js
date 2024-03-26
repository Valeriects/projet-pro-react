import { configureStore } from '@reduxjs/toolkit';

import moviesReducer from "./slices/movie";
import userReducer from "./slices/user";
import categoryReducer from "./slices/category";
import cinemaReducer from "./slices/cinema";
import mediaReducer from "./slices/media";
import mediaMovieReducer from "./slices/mediaMovie";
import roleReducer from "./slices/role";
import orderReducer from "./slices/orders";
import sessionReducer from "./slices/session";
import timeTableReducer from "./slices/timetable";
import movieTheaterReducer from "./slices/movieTheater";
import categoryMovieReducer from "./slices/categoryMovie";

const store = configureStore({
    reducer: {
        movie: moviesReducer,
        user: userReducer,
        category: categoryReducer,
        cinema: cinemaReducer,
        media: mediaReducer,
        mediaMovie: mediaMovieReducer,
        role: roleReducer,
        order: orderReducer,
        session: sessionReducer,
        timeTable: timeTableReducer,
        movieTheater: movieTheaterReducer,
        categoryMovie: categoryMovieReducer,

    }

});

export {store};