import jwt from "jsonwebtoken";

const authJwt = (req, res, next) => {
    const TOKEN = req.cookies.TOKEN_AUTH;


    if (!TOKEN) {
        return res.status(403).json({ error: "No token" });
    }

    jwt.verify(TOKEN, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).json({error: "Invalid token"});
        }
        req.user = decoded;
        next();
    });

};

const authJwtAdmin = (req, res, next) => {
    const TOKEN = req.cookies.TOKEN_AUTH;

    if (!TOKEN) {
        return res.status(403).json({ error: "No token" });
    }

    jwt.verify(TOKEN, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).json({error: "Invalid token"});
        }

        if (decoded.roleUser !== "admin") {
            return res.status(403).json({ error: "Unautorized" });
        }
        
        req.user = decoded;
        next();
    });

};


export { authJwt, authJwtAdmin };