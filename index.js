import express from "express";

import routers from "./routers/index.js";

const app = express();

app.use("/", routers);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Nanoblox app listening at port: ${server.address().port}`);
});
