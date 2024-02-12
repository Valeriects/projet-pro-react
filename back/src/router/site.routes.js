import { Router } from "express";
import { getAllMovies, getAllSessions, getCinemas } from "../controller/site.js";

const router = Router();


router.get("/movie", getAllMovies);

router.get("/session-movie", getAllSessions);

router.get("/cinema", getCinemas);


export default router;