import { Router } from "express";
import { getAllMovies, getAllSessions, getCinemas } from "../controller/site.js";
import { upUser, getUsers } from "../controller/dashboard/user.js"


const router = Router();


router.get("/movie", getAllMovies);

router.get("/session-movie", getAllSessions);

router.get("/cinema", getCinemas);


router.get("/user", getUsers);

router.patch("/user/:id", upUser);


export default router;