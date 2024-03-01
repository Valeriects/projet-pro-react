import Query from "../../model/Query.js";

//le CRUD pour la table movies_media
const getMovieMedias = async (req, res) => {
    try {
        const query = "SELECT * FROM movies_media";

        const listMovieMedia = await Query.run(query);

        res.json(listMovieMedia);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const addMovieMedia = async (req, res) => {
    try {
        const { movies_id, media_id } = req.body;
        const query = "INSERT INTO movies_media (movies_id, media_id ) VALUES (?, ?)";

        //todo ne pas CREER si ça existe déjà !!!
        const data = await Query.runByParams(query, [movies_id, media_id ]);

        res.json({ id: data.insertId, movies_id, media_id  });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

//todo update ne marche pas err         "message": "Malformed communication packet.",
        // todo "code": "ER_MALFORMED_PACKET",
        //todo  "errno": 1835,
const upMovieMedia = async (req, res) => {
    try {
        const { movies_id, media_id  } = req.params;

        const query = "UPDATE movies_media SET media_id = ? WHERE movies_id = ? AND media_id = ?";

        await Query.runByParams(query, [ movies_id, media_id, movies_id, media_id ]);
            
        res.json({ movies_id, media_id  });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const delMovieMedia = async (req, res) => {
    try {
        const { movies_id, media_id  } = req.params;
        const query = "DELETE FROM movies_media WHERE movies_id =? AND media_id = ? ";

        await Query.runByParams(query, [movies_id, media_id ]);

        res.json({ msg : "Association entre movie et media, bien supprimé", movies_id, media_id  });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



//le CRUD pour la table media
const getMedias = async (req, res) => {
    try {
        const query = "SELECT * FROM media";

        const listeMedia = await Query.run(query);

        res.json(listeMedia);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const addMedia = async (req, res) => {
    try {
        const { src_media, alt, type_media } = req.body;
        const query = "INSERT INTO media (src_media, alt, type_media) VALUES (?, ?, ?)";

        const role = await Query.runByParams(query, [src_media, alt, type_media]);

        res.json({ id: role.insertId, src_media, alt, type_media });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const upMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { src_media, alt, type_media } = req.body;

        const query = "UPDATE media SET src_media = ?, alt = ?, type_media = ? WHERE id= ?";

        await Query.runByParams(query, [src_media, alt, type_media, id]);
            
        res.json({ id, src_media, alt, type_media });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const delMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM media WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


//le CRUD pour la table CATEGORY_MOVIE
const getCatMovies = async (req, res) => {
    try {
        const query = "SELECT * FROM categories_movies";

        const listCatMovie = await Query.run(query);

        res.json(listCatMovie);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const addCatMovie = async (req, res) => {
    try {
        const { categories_id, movies_id } = req.body;
        const query = "INSERT INTO categories_movies (categories_id, movies_id) VALUES (?, ?)";

        await Query.runByParams(query, [categories_id, movies_id]);

        res.json({ categories_id, movies_id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

//todo marche pas
const upCatMovie = async (req, res) => {
    try {
        const { categories_id, movies_id } = req.params;
        // const { categories_id, movies_id } = req.body;

        const query = "UPDATE categories_movies SET categories_id = ?, movies_id = ? WHERE categories_id= ? AND movies_id = ?";

        await Query.runByParams(query, [categories_id, movies_id, categories_id, movies_id]);
            
        res.json({ categories_id, movies_id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const deleteCatMovie = async (req, res) => {
    try {
        const { categories_id, movies_id } = req.params;
        const query = "DELETE FROM categories_movies WHERE categories_id = ? AND movies_id = ?";

        await Query.runByParams(query, [categories_id, movies_id]);

        res.json({ categories_id, movies_id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



//le CRUD pour la table categories
const getCategories = async (req, res) => {
    try {
        const query = "SELECT id, name_cat FROM categories";

        const listCategories = await Query.run(query);

        res.json(listCategories);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const addCategory = async (req, res) => {
    try {
        const { name_cat } = req.body;
        const query = "INSERT INTO categories (name_cat) VALUES (?)";

        const role = await Query.runByParams(query, [name_cat]);

        res.json({ id: role.insertId, name_cat });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const upCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_cat } = req.body;

        const query = "UPDATE categories SET name_cat = ? WHERE id= ?";

        await Query.runByParams(query, [name_cat, id]);
            
        res.json({ id, name_cat });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const delCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM categories WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


export { getMovieMedias, addMovieMedia, upMovieMedia, delMovieMedia, getMedias, addMedia, upMedia, delMedia, getCatMovies, addCatMovie, upCatMovie, deleteCatMovie, getCategories, addCategory, upCategory, delCategory };