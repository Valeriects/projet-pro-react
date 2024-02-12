import Query from "../../model/Query.js"

// todo prendrele getmovie de site.js plutot 
const getMovies = async (req, res) => { 
    try {
        const queryMovies = "SELECT * FROM movies";

        const listMovies = await Query.run(queryMovies);

        res.json(listMovies);
       
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const addMovie = async (req, res) => {

    try {
        const { title, synopsis, release_date, director, time, actor } = req.body;

        const queryMovie = "INSERT INTO movies (title, synopsis, release_date, director, time, actor) VALUES (?, ?, ?, ?, ?, ?)";

        const createMovie = await Query.runByParams(queryMovie, [title, synopsis, release_date, director, time, actor]);

        res.json({ id: createMovie.insertId, title, synopsis, release_date, director, time, actor});

    } catch (err) {
        res.status(500).json({ msg: err });
    }
}


const upMovie = async (req, res)=> {
    try {
        const { title, synopsis, release_date, director, time, actor } = req.body;
        const { id } = req.params;

        const queryUp = "UPDATE movies SET title = ?, synopsis = ?, release_date = ?, director = ?, time = ?, actor = ? WHERE id= ?";

        const patchMovie = await Query.runByParams(queryUp, [title, synopsis, release_date, director, time, actor, id]);

        res.json({id, title, synopsis, release_date, director, time, actor});

    } catch (err) {
        res.status(500).json({ 'msg': err });
    }
}

const deleteMovie = async (req, res) => { 
    try {
        const { id } = req.params;

        const queryDel = "DELETE FROM movies WHERE id = ?";

        const deleteMov = await Query.runByParams(queryDel, [id]);

        res.json({ id, msg: "Film supprimé" });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

export { getMovies, addMovie, upMovie, deleteMovie };