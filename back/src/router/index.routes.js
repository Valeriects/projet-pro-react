import { Router } from "express";

import siteRoutes from "./site.routes.js";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import { authJwtAdmin } from "../middlewares/authToken.js";


const router = Router();

router.use("/app", siteRoutes);

router.use("/authentication", authRoutes);

//todo remettre la ligne de dessous pour sécuriser admin
// router.use("/admin", authJwtAdmin, adminRoutes);
router.use("/admin", adminRoutes);


export default router;