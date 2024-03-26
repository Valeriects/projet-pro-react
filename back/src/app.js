import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import router from "./router/index.routes.js";



const PORT = process.env.LOCAL_PORT || process.env.LOCAL_PORT_2;

const app = express();


app.use('/img', express.static(path.join(process.cwd(), "/public/assets/images/")));

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json()); 
 


app.use("/api/v1", router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});