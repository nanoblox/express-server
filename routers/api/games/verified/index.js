import express from "express";
import * as verifiedGamesCollection from "../../../../services/database/collections/verifiedGames";
import serverErrorResponse from "../../../../utilities/serverErrorResponse";
import getObjectIdFromInput from "../../../../utilities/input/getObjectIdFromInput";
import loadAndUpdatePage from "../../../../utilities/loadAndUpdatePage";
import cache from "../../../../services/cache";
import { REDIS_EXPIRATION_TIME } from "../../../../utilities/constants";

const router = express.Router();

router.get("/page", async (request, response) => {
  try {
    if (!cache.connected) {
      const firstPage = await verifiedGamesCollection.getFirstPage();
      if (firstPage.length === 0)
        return response.status(200).json({ success: true, payload: [] });

      const loadedPage = await loadAndUpdatePage(firstPage);
      return response.status(200).json({
        success: true,
        payload: loadedPage,
      });
    }

    const redisKey = "page";
    cache.get(redisKey, async (error, reply) => {
      if (reply) {
        console.log("Cache Hit");
        reply = JSON.parse(reply);
        return response.status(200).json({
          success: true,
          payload: reply,
        });
      } else {
        const firstPage = await verifiedGamesCollection.getFirstPage();
        if (firstPage.length === 0)
          return response.status(200).json({ success: true, payload: [] });

        const loadedPage = await loadAndUpdatePage(firstPage);

        cache.set(redisKey, JSON.stringify(loadedPage));
        cache.expire(redisKey, REDIS_EXPIRATION_TIME);
        return response.status(200).json({
          success: true,
          payload: loadedPage,
        });
      }
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.get("/page/:_id", async (request, response) => {
  try {
    if (!cache.connected) {
      const page = await verifiedGamesCollection.getPageByObjectId(_id);
      if (page.length === 0)
        return response.status(200).json({ success: true, payload: [] });

      const loadedPage = await loadAndUpdatePage(page);
      return response.status(200).json({
        success: true,
        payload: loadedPage,
      });
    }

    const _id = getObjectIdFromInput(request.params);
    const redisKey = `page.${_id.toHexString()}`;
    cache.get(redisKey, async (error, reply) => {
      if (reply) {
        reply = JSON.parse(reply);
        return response.status(200).json({
          success: true,
          payload: reply,
        });
      } else {
        const page = await verifiedGamesCollection.getPageByObjectId(_id);
        if (page.length === 0)
          return response.status(200).json({ success: true, payload: [] });
        const loadedPage = await loadAndUpdatePage(page);

        cache.set(redisKey, JSON.stringify(loadedPage));
        cache.expire(redisKey, REDIS_EXPIRATION_TIME);
        return response.status(200).json({
          success: true,
          payload: loadedPage,
        });
      }
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

export default router;
