import Query from "../../model/Query.js";
// import bcrypt from "bcrypt";


// const getUsers = async (req, res) => {  
//     try {
//         const queryUsers = "SELECT * FROM users ORDER BY last_connection_date DESC";

//         const listUsers = await Query.run(queryUsers);

//         res.json(listUsers);

//     } catch (err) {
//         res.status(500).json({ msg: err });
//     }
// };


const upUser = async (req, res) => {
    try {
        const { roles_id } = req.body;
        const { id } = req.params;

        // console.log(req.body);

        const queryUser = "UPDATE users SET roles_id = ? WHERE id = ?";

        await Query.runByParams(queryUser, [roles_id, id]);

        // console.log();
        res.json({roles_id, id});

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const delUser = async (req, res) => {
    try {
        const { id } = req.params;

        const queryDel = "DELETE FROM users WHERE id = ?";


        //todo à faire avec les cookies 
        //on ne peut pas supprimer l'administrateur qui est le seul a avoir le role 1
        // const queryRoleAdmin = "SELECT roles_id FROM users WHERE id = ?";

        // const roleAdmin = await Query.run(queryRoleAdmin, [id]);

        // if(roleAdmin !== 1){
            await Query.runByParams(queryDel, [id]);
            
            res.json({ msg: "Bien supprimé", id })
            // }
            
            // if(req.user.roles_id === 1){
    
            //     res.json({ msg: "Vous ne pouvez pas supprimer le compte administrateur", id })
            // }
        


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