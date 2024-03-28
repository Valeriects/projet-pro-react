import { Router } from "express";
import { delUser, getRoles, addRole, upRole, delRole } from "../controller/admin/users.js";
import { upUser, getUsers } from "../controller/dashboard/user.js";
import { getMovies, addMovie, upMovie, deleteMovie } from "../controller/admin/movies.js";
import { getCinemas, addCinema, upCinema, deleteCinema, getTheaters, addTheater, upTheater, delTheater } from "../controller/admin/cinemas.js";
import { getSessions, addSession, upSession, deleteSession, delTimetable, upTimetable, addTimetable, getTimetables } from "../controller/admin/sessionTime.js";
import { getOrders, addOrder, upOrder, deleteOrder } from "../controller/admin/orders.js";
import { getMovieMedias, addMovieMedia, upMovieMedia, delMovieMedia, getMedias, addMedia, upMedia, delMedia,getCatMovies, addCatMovie, upCatMovie, deleteCatMovie, getCategories, addCategory, upCategory, delCategory } from "../controller/admin/categories-and-media.js";

// import { multerStorage, storage } from "../middlewares/multer-config.js";
import { storage, upload } from "../middlewares/multer-config.js";

const router = Router();

//routes USER
router.get("/user", getUsers);
router.patch("/user/:id", upUser); //dans site.routes
router.delete("/user/:id", delUser);

//routes MOVIE 
router.get("/movie", getMovies);
router.post("/movie", addMovie);
router.patch("/movie/:id", upMovie);
router.delete("/movie/:id", deleteMovie);

//routes ROLE
router.get("/role", getRoles);
router.post("/role", addRole);
router.patch("/role/:id", upRole);
router.delete("/role/:id", delRole);

//routes CINEMA
// router.get("/cinema", getCinemas); //todo dans la route site.routes.js
router.post("/cinema", addCinema);
router.patch("/cinema/:id", upCinema);
router.delete("/cinema/:id", deleteCinema);

//routes MOVIE_THEATER
router.get("/movie-theater", getTheaters);
router.post("/movie-theater", addTheater);
router.patch("/movie-theater/:id", upTheater);
router.delete("/movie-theater/:id", delTheater);

//routes SESSION 
router.get("/session-movie", getSessions);
router.post("/session-movie", addSession);
router.patch("/session-movie/:id", upSession);
router.delete("/session-movie/:id", deleteSession);

//routes TIMETABLE
router.get("/timetable", getTimetables);
router.post("/timetable", addTimetable);
router.patch("/timetable/:id", upTimetable);
router.delete("/timetable/:id", delTimetable);

//routes ORDER
router.get("/order", getOrders);
router.post("/order", addOrder); //TODO mettre dans site.js ?
router.patch("/order/:id", upOrder);
router.delete("/order/:id", deleteOrder);

//routes MOVIE_MEDIA 
router.get("/movie-media", getMovieMedias);
router.post("/movie-media", addMovieMedia);
router.patch("/movie-media/:id", upMovieMedia);
router.delete("/movie-media/:id", delMovieMedia);

//routes MEDIA
router.get("/media", getMedias);
// router.post("/media", multerStorage, addMedia);
// router.patch("/media/:id", multerStorage, upMedia);
router.post("/media", upload.single('src_img'), addMedia);
// router.post("/media",storage, upload.single('src_img'), addMedia);
// router.patch("/media/:id", storage, upload.single('src_img'), upMedia);
router.delete("/media/:id", delMedia);

//routes CATEGORY_MOVIE
router.get("/4", getCatMovies);
router.post("/category-movie", addCatMovie);
router.patch("/category-movie/:id", upCatMovie);
router.delete("/category-movie/:id", deleteCatMovie);

//routes CATEGORY
router.get("/category", getCategories);
router.post("/category", addCategory);
router.patch("/category/:id", upCategory);
router.delete("/category/:id", delCategory);



export default router;