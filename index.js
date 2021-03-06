import express from "express";
import cors from "cors";
import session from "./services/session";

import "./services/database";

import routers from "./routers/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.enable("trust proxy");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session);

app.use("/", routers);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Nanoblox app listening at port: ${server.address().port}`);
});
