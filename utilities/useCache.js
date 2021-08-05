import cache from "../services/cache";
import { REDIS_EXPIRATION_TIME } from "./constants";
import { promisify } from "util";

const getAsync = promisify(cache.get).bind(cache);

export default async function useCache(cacheKey, payloadGenerator) {
  if (!cache.connected) {
    const { payload } = await payloadGenerator();
    return payload;
  }

  const reply = await getAsync(cacheKey);
  if (reply) {
    const parsedReply = JSON.parse(reply);
    return parsedReply;
  } else {
    const { payload, meta } = await payloadGenerator();

    if (meta.shouldCache) {
      cache.set(cacheKey, JSON.stringify(payload));
      cache.expire(cacheKey, REDIS_EXPIRATION_TIME);
    }

    return payload;
  }
}
