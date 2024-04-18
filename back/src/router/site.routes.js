import { Router } from "express";
import { getAllMovies, getSession, getCinemas, getSeatsForSession, addOrder } from "../controller/site.js";
import { upUser, getUsers } from "../controller/dashboard/user.js";



const router = Router();


router.get("/movie", getAllMovies);

router.get("/movie/:id/timetable/:idTimetable", getSession);

//afficher les places restantes pour une séance spécifique
router.get("/session/:id", getSeatsForSession);

router.post("/order", addOrder);

router.get("/cinema", getCinemas);


router.get("/user", getUsers);

router.patch("/user/:id", upUser);


export default router;