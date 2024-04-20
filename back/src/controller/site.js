import Query from "../model/Query.js";
import { addArray } from "../utils/addArray.js";

const getAllMovies = async (req, res) => {
    try {
        const queryMovies = "SELECT * FROM movies";

        const allMovies = await Query.run(queryMovies);

        const queryCategories = "SELECT movies.id AS movieId, categories.name_cat FROM movies JOIN categories_movies ON movies.id = categories_movies.movies_id JOIN categories ON categories_movies.categories_id = categories.id";

        const allCategories = await Query.run(queryCategories);

        const queryMedias = "SELECT movies.id AS movieId, src_img, alt_img, src_video, alt_video FROM movies JOIN media ON media.movies_id = movies.id";

        const allMedia = await Query.run(queryMedias);

        const queryTime = "SELECT hours_timetable, timetables.id AS timetableId, movies.id AS movieId, sessions.id AS sessionId FROM movies JOIN sessions ON movies.id = sessions.movies_id JOIN timetables ON sessions.timetables_id = timetables.id WHERE timetables.id";       

        const allTimes = await Query.run(queryTime);

        const mergeDatas = addArray(allMovies, allCategories, allMedia, allTimes);

        res.json(mergeDatas);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


const getSession = async (req, res) => {
    try {

        const { id, idTimetable } = req.params;
      
        const query = "SELECT movies.id, movies.title, movies.time, movies.director, movies.actor, movies.release_date, sessions.*, sessions.id AS session_id, movie_theaters.*, cinemas.*, timetables.*, media.alt_img, media.src_img FROM movies JOIN sessions ON movies.id = sessions.movies_id JOIN movie_theaters ON sessions.movie_theaters_id = movie_theaters.id JOIN timetables ON timetables.id = sessions.timetables_id JOIN cinemas ON cinemas.id = movie_theaters.cinemas_id JOIN media ON media.movies_id = movies.id WHERE movies.id = ? AND timetables.id = ?";
        

        const sessionMovie = await Query.runByParams(query, [id, idTimetable]);

        res.json(sessionMovie);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const getSeatsForSession = async (req, res) => {
    try {
        const { id } = req.params;

        const query = "SELECT movie_theaters.nbr_seats AS total_seats, (movie_theaters.nbr_seats - SUM(orders.nbr_seats_payed)) AS remaining_places, SUM(orders.nbr_seats_payed) AS seats_payed FROM orders JOIN sessions ON orders.sessions_id = sessions.id JOIN movie_theaters ON sessions.movie_theaters_id = movie_theaters.id WHERE sessions.id = ?";

        const sumSeatsBySession = await Query.runByParams(query, [id]);

        res.json(sumSeatsBySession);
    } catch(err) {
        res.status(500).json({ msg: err });
    }
}


const getCinemas = async (req, res) => {
    try {
        const query = "SELECT * FROM cinemas";

        const listCinema = await Query.run(query);

        res.json(listCinema);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const addOrder = async (req, res) => {
    try {
        const { users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, nbr_seats_payed } = req.body;
        
        const query = "INSERT INTO orders (users_id, sessions_id, order_date, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, nbr_seats_payed) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        await Query.runByParams(query, [users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, nbr_seats_payed]);

        res.json({ users_id, sessions_id, price_order, num_CB, cb_date, cryptogramme, lastname, firstname, email, name_cb, nbr_seats_payed });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


export { getAllMovies, getSession, getCinemas, getSeatsForSession, addOrder };