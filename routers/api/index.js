import express from "express";

import gamesRouter from "./games";
import resourcesRouter from "./resources";

const router = express.Router();

router.use("/games", gamesRouter);
router.use("/resources", resourcesRouter);

export default router;
