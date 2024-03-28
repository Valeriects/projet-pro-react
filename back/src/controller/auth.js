import Query from "../model/Query.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const queryLogin = "SELECT * FROM users WHERE email = ?";

        const [userExist] = await Query.runByParams(queryLogin, [email]);

        const compareHash = await bcrypt.compare(password, userExist.password);
     
        console.log("password :", password);
        console.log("mdpBDD :", userExist.password);
        console.log(compareHash);
   
        if (!userExist || !(compareHash)) { 
            return res.status(409).json({ message: "Identifiants incorrects" });
        }

        //pour ajouter la dernière date de connexion:
        const queryLastDate = "UPDATE users SET last_connection_date = NOW() WHERE email = ?";

        const upLastDate = await Query.runByParams(queryLastDate, [email]);
    

        // role pour le token:
        const roleUser = userExist.roles_id === 1 ? "admin" : "user";

        //token:
        const TOKEN = jwt.sign(
            { id: userExist.id, firstname : userExist.firstname, roleUser }, //données du payload
            process.env.SECRET_TOKEN,
            { expiresIn: "1h" }
        );
            
        res.cookie("TOKEN_AUTH", TOKEN, {
            httpOnly: true,
            maxAge: 3600000
        });


        res.json({
            msg: "Connexion réussie",
            id: userExist.id,
            firstname: userExist.firstname,
            roleUser
        });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


const userRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        const queryUser = "SELECT * FROM users WHERE email = ?"; 

        const userExist = await Query.runByParams(queryUser, [email]);

        if (!userExist.length) {
            const salt = Number(process.env.BCRYPT_SALT);
            const hash = await bcrypt.hash(password, salt);

            const queryRegister = "INSERT INTO users (email, password, created_date, roles_id) VALUES (?, ?, NOW(), 2)";

            const registerUser = await Query.runByParams(queryRegister, [email, hash]);
            
            if (registerUser.insertId) {
                res.status(201).json({ message: "Compte créé" });
            }
        }

        if (userExist.length) {
            res.status(409).json({
                message: "Compte non créé, veuillez réessayer",
            });
        }

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


const userLogout = async (req, res) => { 
    res.clearCookie("TOKEN_AUTH");
    res.json({ message: "Déconnexion réussie" });
};


const checkToken = (req, res) => {
        res.json({ user: req.user });
};

export { userLogin, userRegister, userLogout, checkToken };