import Query from "../../model/Query.js";

//le CRUD pour la table sessions
const getSessions = async (req, res) => {
    try {
        const querySession = "SELECT * FROM sessions";

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

        const SessionDelete = await Query.runByParams(query, [id]);

        res.json({ msg: "Séance supprimée", id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

export { getSessions, addSession, upSession, deleteSession };