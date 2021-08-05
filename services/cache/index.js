import redis from "redis";

import dotenv from "dotenv";
dotenv.config();

const client = redis.createClient(process.env.REDIS_URL);

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
