import Query from "../model/Query.js";
import { addArray, addArray2 } from "../utils/addArray.js";

const getAllMovies = async (req, res) => {
    try {
        const queryMovies = "SELECT * FROM movies";

        const allMovies = await Query.run(queryMovies);

        const queryCategories = "SELECT movies.id AS movieId, categories.name_cat FROM movies JOIN categories_movies ON movies.id = categories_movies.movies_id JOIN categories ON categories_movies.categories_id = categories.id";

        const allCategories = await Query.run(queryCategories);

        const queryMedias = "SELECT movies.id AS movieId, src_img, alt_img, src_video, alt_video FROM movies JOIN movies_media ON movies.id = movies_id JOIN media ON media.id = media_id";

        const allMedia = await Query.run(queryMedias);

        const mergeDatas = addArray(allMovies, allCategories, allMedia);
            
        res.json(mergeDatas);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

//todo pas besoin du sql pour un seul film
// const getOneMovie = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const queryMovie = "SELECT * FROM movies WHERE id = ?";

//         const allMovies = await Query.runByParams(queryMovie, [id]);

//         const queryCategories = "SELECT movies.id AS movieId, categories.name_cat FROM movies JOIN categories_movies ON movies.id = categories_movies.movies_id JOIN categories ON categories_movies.categories_id = categories.id";

//         const allCategories = await Query.run(queryCategories);

//         const queryMedias = "SELECT movies.id AS movieId, src_media, alt, type_media FROM movies JOIN movies_media ON movies.id = movies_id JOIN media ON media.id = media_id";

//         const allMedia = await Query.run(queryMedias);

//         const mergeDatas = addArray(allMovies, allCategories, allMedia);
            
//         res.json(mergeDatas);

//     } catch (err) {
//         res.status(500).json({ msg: err });
//     }
// };


// todo revoir la BDD pour la seance/session et le timetable
const getAllSessions = async (req, res) => {
    try {
        const querySessions = "SELECT sessions.*, title, name_theater FROM movies JOIN sessions ON movies.id = sessions.movies_id JOIN movie_theaters ON movie_theaters.id = sessions.movie_theaters_id";

        const allsessions = await Query.run(querySessions);

        res.json(allsessions);

    } catch (err) {
        res.status(500).json({ msg: err });
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


export { getAllMovies, getAllSessions, getCinemas };