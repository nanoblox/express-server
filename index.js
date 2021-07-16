import express from "express";

import "./services/database";

import routers from "./routers/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routers);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Nanoblox app listening at port: ${server.address().port}`);
});
