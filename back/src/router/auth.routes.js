import { Router } from "express";
import { userLogin, userRegister, userLogout, checkToken } from "../controller/auth.js";
import {authJwt} from "../middlewares/authToken.js";


const router = Router();

router.post("/login", userLogin);

router.post("/register", userRegister);

router.get("/logout", userLogout);

router.get("/check-token", authJwt, checkToken);


export default router;