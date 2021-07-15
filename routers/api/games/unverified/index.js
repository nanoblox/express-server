import express from "express";

import notImplemented from "../../../../middlewares/notImplemented";

const router = express.Router();

router.post("/add", notImplemented, async (request, response) => {});

router.post("/remove", notImplemented, async (request, response) => {});

router.post("/approve", notImplemented, async (request, response) => {});

router.post("/decline", notImplemented, async (request, response) => {});

router.get("/page", notImplemented, async (request, response) => {});

router.get("/page/:_id", notImplemented, async (request, response) => {});

export default router;
