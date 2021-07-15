import express from "express";

import gamesRouter from "./games";

const router = express.Router();

router.use("/games", gamesRouter);

export default router;
