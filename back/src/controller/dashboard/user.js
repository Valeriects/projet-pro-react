import Query from "../../model/Query.js";
import bcrypt from "bcrypt";

const upUser = async (req, res) => {
    try {
        const { firstname, lastname, newPassword, address, email, phone, birthday } = req.body;
        const { id } = req.params;
        
        console.log(req.body);
        //on hash le nouveau password

        const query = `UPDATE users SET${Object.keys(req.body)
            .map((key) => ` ${key} = ?`)
            .join(",")
            } WHERE id = ?`;
        console.log(query);
        const result = await Query.runByParams(query, [...Object.values(req.body), id]);

        
        // if (newPassword) {
        //     const salt = Number(process.env.BCRYPT_SALT);
        //     const queryPwd = "UPDATE users SET firstname = ?, lastname = ?, password = ?, address = ?, email = ?, phone = ?, birthday = ? WHERE id = ?";
            
        //     const hashPassword = await bcrypt.hash(newPassword, salt);
        //     await Query.runByParams(queryPwd, [firstname, lastname, hashPassword, address, email, phone, birthday, id]);
        // } else {
        //     const queryUser = "UPDATE users SET firstname = ?, lastname = ?, address = ?, email = ?, phone = ?, birthday = ? WHERE id = ?";

        //     await Query.runByParams(queryUser, [firstname, lastname, address, email, phone, birthday, id]);
        // }
        const queryUser = "SELECT id, firstname, lastname, address, email, phone, birthday, created_date, last_connection_date, roles_id FROM users WHERE id = ?";

        const [read] = await Query.runByParams(queryUser, [id]);

        console.log(result);
        console.log(read);
        res.json(read);

    } catch (err) {
        // res.status(500).json({ msg: err });
        console.log(err);
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
        const queryUsers = "SELECT id, firstname, lastname, address, email, phone, birthday, created_date, last_connection_date, roles_id FROM users ORDER BY last_connection_date DESC";

        const listUsers = await Query.run(queryUsers);

        res.json(listUsers);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



export { upUser, getUsers };