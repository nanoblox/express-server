import redis from "redis";

import dotenv from "dotenv";
dotenv.config();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

process.on("exit", () => {
  client.quit();
});

const cache = client;
export default cache;
