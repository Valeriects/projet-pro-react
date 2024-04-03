import Query from "../../model/Query.js";
import bcrypt from "bcrypt";

const upUser = async (req, res) => {
    try {
        const { firstname, lastname, password, address, email, phone, birthday } = req.body;
        const { id } = req.params;
        
        console.log("req.body: ", req.body);
        
        //DEBUT CODE BON debug pour les données des inputs :
            //on met à jour uniquement les clefs d'un objet qui sont associés au req.body envoyé dans le formulaire
            // const query = `UPDATE users SET ${Object.keys(req.body)
            //     .map((key) => `${key} = ?`)
            //     .join(", ")
            //     } WHERE id = ?`;
            // console.log(query);
            //en paramètre on a la valeur de l'objet, associé au valeur de req.body
            // await Query.runByParams(query, [...Object.values(req.body), id]);
       //FIN CODE BON
        
        const salt = Number(process.env.BCRYPT_SALT);
        
        //on hash le nouveau password
        // const hashPassword = await bcrypt.hash(password, salt);
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
        
        console.log("query password :", query);

        console.log("hashPassword :", hashPassword)

        await Query.runByParams(query, queryParams);
          

        const queryUser = "SELECT id, firstname, lastname, address, email, phone, birthday, created_date, last_connection_date, roles_id FROM users WHERE id = ?";

        const [read] = await Query.runByParams(queryUser, [id]);

        // console.log(result);
        console.log("read :", read);
        res.json(read);

    } catch (err) {
        res.status(500).json({ msg: err });
        // console.log(err);
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