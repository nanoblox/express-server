import redis from "redis";

import dotenv from "dotenv";
dotenv.config();

const client = redis.createClient(process.env.REDIS_URL);

process.on("exit", () => {
  client.quit();
});

const cache = client;
export default cache;
