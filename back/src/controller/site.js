import Query from "../model/Query.js";
import { addArray, addArray2 } from "../utils/addArray.js";

const getAllMovies = async (req, res) => {
    try {
        const queryMovies = "SELECT * FROM movies";

        const allMovies = await Query.run(queryMovies);

        const queryCategories = "SELECT movies.id AS movieId, categories.name_cat FROM movies JOIN categories_movies ON movies.id = categories_movies.movies_id JOIN categories ON categories_movies.categories_id = categories.id";

        const allCategories = await Query.run(queryCategories);

        const queryMedias = "SELECT movies.id AS movieId, src_img, alt_img, src_video, alt_video FROM movies JOIN movies_media ON movies.id = movies_media.movies_id JOIN media ON media.id = movies_media.media_id";

        const allMedia = await Query.run(queryMedias);

        const queryTime = "SELECT hours_timetable, timetables.id AS timetableId, movies.id AS movieId FROM movies JOIN sessions ON movies.id = sessions.movies_id JOIN timetables ON sessions.timetables_id = timetables.id";       
        // const queryTime = "SELECT hours_timetable, session_date, price, language, version _2D_3D, name_theater, nrb_seats ";

        const allTimes = await Query.run(queryTime);

        const mergeDatas = addArray(allMovies, allCategories, allMedia, allTimes);
        // const mergeDatas = addArray(allMovies, allCategories, allMedia);
            
        res.json(mergeDatas);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


// todo revoir la BDD pour la seance/session et le timetable
const getSession = async (req, res) => {
    try {

        const { id, idSession } = req.params;
      
        // const query = "SELECT movies.id, movies.title, movies.time, movies.director, movies.actor, movies.release_date, sessions.*, movie_theaters.*, cinemas.*, timetables.* FROM movies JOIN sessions ON movies.id = sessions.movies_id JOIN movie_theaters ON sessions.movie_theaters_id = movie_theaters.id JOIN timetables ON timetables.id = sessions.timetables_id JOIN cinemas ON cinemas.id = movie_theaters.cinemas_id WHERE movies.id = ? AND timetables.id = ?";
        const query = "SELECT movies.id, movies.title, movies.time, movies.director, movies.actor, movies.release_date, sessions.*, movie_theaters.*, cinemas.*, timetables.*, media.alt_img, media.src_img FROM movies JOIN sessions ON movies.id = sessions.movies_id JOIN movie_theaters ON sessions.movie_theaters_id = movie_theaters.id JOIN timetables ON timetables.id = sessions.timetables_id JOIN cinemas ON cinemas.id = movie_theaters.cinemas_id JOIN movies_media ON movies_media.movies_id = movies.id JOIN media ON media.id = movies_media.media_id WHERE movies.id = ? AND timetables.id = ?";
        

        const sessionMovie = await Query.runByParams(query, [id, idSession]);

        res.json(sessionMovie);

    } catch (err) {
        res.status(500).json({ msg: err });
        // console.log(err);
    }
};


const getCinemas = async (req, res) => {
    try {
        const query = "SELECT * FROM cinemas";

        const listCinema = await Query.run(query);

        res.json(listCinema);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


export { getAllMovies, getSession, getCinemas };