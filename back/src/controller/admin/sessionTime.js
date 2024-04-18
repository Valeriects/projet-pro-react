import Query from "../../model/Query.js";

//le CRUD pour la table sessions
const getSessions = async (req, res) => {
    try {
        const querySession = "SELECT sessions.*, movies.title, movies.id AS movieID, movies.time, timetables.hours_timetable, timetables.id AS hoursId, movie_theaters.name_theater, movie_theaters.id AS movieTheaterId FROM sessions JOIN movies ON sessions.movies_id = movies.id JOIN timetables ON sessions.timetables_id = timetables.id JOIN movie_theaters ON sessions.movie_theaters_id = movie_theaters.id ORDER BY session_date DESC";

        const listSession = await Query.run(querySession);

        res.json(listSession);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const addSession = async (req, res) => {
    try {
        const { session_date, price, language, version_2D_3D, movies_id, timetables_id, movie_theaters_id } = req.body;

        const querySession = "INSERT INTO sessions (session_date, price, language, version_2D_3D, movies_id, timetables_id, movie_theaters_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

        const session = await Query.runByParams(querySession, [session_date, price, language, version_2D_3D, movies_id, timetables_id, movie_theaters_id]);

        res.json({ id: session.insertId, session_date, price, language, version_2D_3D, movies_id, timetables_id, movie_theaters_id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const upSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { session_date, price, language, version_2D_3D, movies_id, timetables_id, movie_theaters_id } = req.body;

        const querySession = "UPDATE sessions SET session_date = ?, price = ?, language = ?, version_2D_3D = ?, movies_id = ?, timetables_id = ?, movie_theaters_id = ? WHERE id= ?";

        await Query.runByParams(querySession, [session_date, price, language, version_2D_3D, movies_id, timetables_id, movie_theaters_id, id]);
            
        res.json({ id, session_date, price, language, version_2D_3D, movies_id, timetables_id, movie_theaters_id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM sessions WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ msg: "Séance supprimée", id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


//le CRUD pour la table timetables
const getTimetables = async (req, res) => {
    try {
        const query = "SELECT id, hours_timetable FROM timetables";

        const listeTime = await Query.run(query);

        res.json(listeTime);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const addTimetable = async (req, res) => {
    try {
        const { hours_timetable } = req.body;
        const query = "INSERT INTO timetables (hours_timetable) VALUES (?)";

        const time = await Query.runByParams(query, [hours_timetable]);

        res.json({ id: time.insertId, hours_timetable });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const upTimetable = async (req, res) => {
    try {
        const { id } = req.params;
        const { hours_timetable } = req.body;

        const query = "UPDATE timetables SET hours_timetable = ? WHERE id= ?";

        await Query.runByParams(query, [hours_timetable, id]);
            
        res.json({ id, hours_timetable });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const delTimetable = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM timetables WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


export { getSessions, addSession, upSession, deleteSession, delTimetable, upTimetable, addTimetable, getTimetables };