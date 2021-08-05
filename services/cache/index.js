import redis from "redis";

import dotenv from "dotenv";
dotenv.config();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on("connect", () => console.log("Redis Connected"));
client.on("ready", () => console.log("Redis Ready"));
client.on("reconnecting", () => console.log("Redis Reconnecting"));
client.on("error", (error) => console.log(`Redis Error: ${error}`));
client.on("end", () => console.log("Redis End"));

process.on("exit", () => {
  client.quit();
});

const cache = client;
export default cache;
