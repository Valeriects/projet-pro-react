import Query from "../../model/Query.js";

const getCount = async (req, res) => {
    try {
        //todo
        const query = "SELECT (SELECT COUNT(*) FROM users) AS nombre_d_utilisateurs, (SELECT COUNT(*) FROM orders) AS nombre_de_réservationss, (SELECT COUNT(*) FROM movies) AS nombre_de_films, (SELECT COUNT(*) FROM sessions) AS nombre_de_séances";

        const [count ]= await Query.run(query);

        res.json({count});

    } catch (err) {
        
        res.status(500).json({ msg: err });
    }    
}

export { getCount };