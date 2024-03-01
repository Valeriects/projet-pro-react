import Query from "../../model/Query.js";
import bcrypt from "bcrypt";

const upUser = async (req, res) => {
    try {
        const { firstname, lastname, password, address, email, phone, birthday } = req.body;
        const { id } = req.params;

        const queryUser = "UPDATE users SET firstname = ?, lastname = ?, password = ?, address = ?, email = ?, phone = ?, birthday = ? WHERE id = ?";

        //on hash le password
        const salt = Number(process.env.BCRYPT_SALT);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await Query.runByParams(queryUser, [firstname, lastname, hashPassword, address, email, phone, birthday, id]);

        res.json({ id, firstname, lastname, password: hashPassword, address, email, phone, birthday });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

// const getUser = async (req, res) => {  
//     try {
//         const { id } = req.params;
//         const queryUsers = "SELECT * FROM users WHERE id = ?";

//         const listUsers = await Query.runByParams(queryUsers, [id]);

//         res.json(listUsers);

//     } catch (err) {
//         res.status(500).json({ msg: err });
//     }
// };

const getUsers = async (req, res) => {  
    try {
        const queryUsers = "SELECT * FROM users ORDER BY last_connection_date DESC";

        const listUsers = await Query.run(queryUsers);

        res.json(listUsers);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



export { upUser, getUsers };