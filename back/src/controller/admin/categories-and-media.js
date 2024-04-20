import Query from "../../model/Query.js";

//le CRUD pour la table media
const getMedias = async (req, res) => {
    try {
        const query = "SELECT media.*, movies.title FROM media JOIN movies ON media.movies_id = movies.id";

        const listeMedia = await Query.run(query);

        res.json(listeMedia);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const addMedia = async (req, res) => {
    try {
        const { alt_img, alt_video, src_video, movies_id } = req.body;
        const { filename } = req.file;

        const query = "INSERT INTO media (src_img, alt_img, alt_video, src_video, movies_id) VALUES (?, ?, ?, ?, ?)";

        const data = await Query.runByParams(query, [filename, alt_img, alt_video, src_video, movies_id]);

        res.json({ id: data.insertId, filename, alt_img, alt_video, src_video, movies_id });


    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const upMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const filename = req.file ? req.file.filename : undefined;

        const query = `UPDATE media SET ${Object.keys(req.body)
            .filter((key) => key !== "src_img")
            .map((key) => `${key} = ?`)
            .join(", ")
            }${filename ? ", src_img = ?" : ""} WHERE id = ?`;
        
        const queryParams = Object.keys(req.body)
            .filter((key) => key !== "src_img")
            .map(key => req.body[key])
            .concat(filename ? [filename, id] : [id])
            
        const up = await Query.runByParams(query, queryParams);
            
        res.json({ up});

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
        const query = "SELECT categories_movies.id, categories_id, movies_id, categories.name_cat, movies.title FROM categories_movies JOIN categories ON categories_movies.categories_id = categories.id JOIN movies ON movies.id = categories_movies.movies_id";

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

const upCatMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { categories_id, movies_id } = req.body;

        const query = "UPDATE categories_movies SET categories_id = ?, movies_id = ? WHERE id = ?";

        await Query.runByParams(query, [categories_id, movies_id, id]);
            
        res.json({ id, categories_id, movies_id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const deleteCatMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM categories_movies WHERE id = ?";

        await Query.runByParams(query, [id]);

        res.json({ id });

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


export { getMedias, addMedia, upMedia, delMedia, getCatMovies, addCatMovie, upCatMovie, deleteCatMovie, getCategories, addCategory, upCategory, delCategory };