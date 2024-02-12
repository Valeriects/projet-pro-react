import Query from "../../model/Query.js";


//le CRUD pour la table cinemas
const getCinemas = async (req, res) => { //todo l'effacer ??? déjà dans la route site
    try {
        const query = "SELECT * FROM cinemas";

        const listCinema = await Query.run(query);

        res.json(listCinema);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const addCinema = async (req, res) => {
    try {
        const { name_cinema, manager, address_cine, phone_cine, email_cine, infos_cine, nbr_theater, disabled_access } = req.body;
        const query = "INSERT INTO cinemas (name_cinema, manager, address_cine, phone_cine, email_cine, infos_cine, nbr_theater, disabled_access) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const result = await Query.runByParams(query, [name_cinema, manager, address_cine, phone_cine, email_cine, infos_cine, nbr_theater, disabled_access]);

        res.json({ id: result.insertId, name_cinema, manager, address_cine, phone_cine, email_cine, infos_cine, nbr_theater, disabled_access });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const upCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_cinema, manager, address_cine, phone_cine, email_cine, infos_cine, nbr_theater, disabled_access } = req.body;

        const query = "UPDATE cinemas SET name_cinema= ?, manager= ?, address_cine= ?, phone_cine= ?, email_cine= ?, infos_cine= ?, nbr_theater= ?, disabled_access= ? WHERE id= ?";

        await Query.runByParams(query, [name_cinema, manager, address_cine, phone_cine, email_cine, infos_cine, nbr_theater, disabled_access, id]);
            
        res.json({ id, name_cinema, manager, address_cine, phone_cine, email_cine, infos_cine, nbr_theater, disabled_access });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const deleteCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM cinemas WHERE id = ?";

        const cinemaDelete = await Query.runByParams(query, [id]);

        res.json({ id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



//le CRUD pour la table movie_theater:
const getTheaters = async (req, res) => {
    try {
        const query = "SELECT * FROM movie_theaters";

        const listTheaters = await Query.run(query);

        res.json(listTheaters);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const addTheater = async (req, res) => {
    try {
        const { name_theater, nbr_seats, disabled_access } = req.body;
        const query = "INSERT INTO movie_theaters (name_theater, nbr_seats, disabled_access, cinemas_id) VALUES (?, ?, ?, 1)";

        const theater = await Query.runByParams(query, [name_theater, nbr_seats, disabled_access]);

        res.json({ id: theater.insertId, name_theater, nbr_seats, disabled_access });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const upTheater = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_theater, nbr_seats, disabled_access } = req.body;

        const query = "UPDATE movie_theaters SET name_theater = ?, nbr_seats = ?, disabled_access = ? WHERE id= ?";

        await Query.runByParams(query, [name_theater, nbr_seats, disabled_access, id]);
            
        res.json({ id, name_theater, nbr_seats, disabled_access });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const delTheater = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM movie_theaters WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



export { getCinemas, addCinema, upCinema, deleteCinema, getTheaters, addTheater, upTheater, delTheater };