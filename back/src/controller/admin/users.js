import Query from "../../model/Query.js";

const upUser = async (req, res) => {
    try {
        const { roles_id } = req.body;
        const { id } = req.params;

        const queryUser = "UPDATE users SET roles_id = ? WHERE id = ?";

        await Query.runByParams(queryUser, [roles_id, id]);

        res.json({roles_id, id});

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const delUser = async (req, res) => {
    try {
        const { id } = req.params;

        const queryDel = "DELETE FROM users WHERE id = ?";

        await Query.runByParams(queryDel, [id]);
        
        res.json({ msg: "Bien supprimé", id })

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



//le CRUD pour la table roles
const getRoles = async (req, res) => {
    try {
        const queryRole = "SELECT id, name_role FROM roles";

        const listRole = await Query.run(queryRole);

        res.json(listRole);
        

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const addRole = async (req, res) => {
    try {
        const { name_role } = req.body;
        const queryRole = "INSERT INTO roles (name_role) VALUES (?)";

        const role = await Query.runByParams(queryRole, [name_role]);

        res.json({ id: role.insertId, name_role });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const upRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_role } = req.body;

        const queryRole = "UPDATE roles SET name_role = ? WHERE id= ?";

        const role = await Query.runByParams(queryRole, [name_role, id]);
            
        res.json({ id, name_role });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
const delRole = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM roles WHERE id = ?";

        const roleDelete = await Query.runByParams(query, [id]);

        res.json({ id });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

export { upUser, delUser, getRoles, addRole, upRole, delRole };