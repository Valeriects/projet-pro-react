import Query from "../../model/Query.js";
import bcrypt from "bcrypt";

const upUser = async (req, res) => {
    try {
        const { firstname, lastname, password, address, email, phone, birthday } = req.body;
        const { id } = req.params;
     
        
        const salt = Number(process.env.BCRYPT_SALT);
        
        //on hash le nouveau password
        let hashPassword; 
        
        if(password){
            hashPassword = await bcrypt.hash(password, salt);
        }

        const query = `UPDATE users SET ${Object.keys(req.body)
            .map((key) => key !== "password" ? `${key} = ?` : "password = ?" )
            .join(", ")
            } WHERE id = ?`;
        
        
        const queryParams = Object.keys(req.body)
            .map(key => key !== "password" ? req.body[key] : hashPassword || null)
            .concat([id]);

        await Query.runByParams(query, queryParams);
          

        const queryUser = "SELECT id, firstname, lastname, address, email, phone, birthday, created_date, last_connection_date, roles_id FROM users WHERE id = ?";

        const [read] = await Query.runByParams(queryUser, [id]);
     
        res.json(read);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

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