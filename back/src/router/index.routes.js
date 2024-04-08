import { Router } from "express";

import siteRoutes from "./site.routes.js";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import { authJwtAdmin } from "../middlewares/authToken.js";


const router = Router();

router.use("/app", siteRoutes);

router.use("/authentication", authRoutes);

router.use("/admin", authJwtAdmin, adminRoutes); //ajout du middleware de protection de la route admin


export default router;