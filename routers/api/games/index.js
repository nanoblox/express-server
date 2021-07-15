import express from "express";

import unverifiedRouter from "./unverified";
import verifiedRouter from "./verified";

const router = express.Router();

router.use("/unverified", unverifiedRouter);
router.use("/verified", verifiedRouter);

export default router;
