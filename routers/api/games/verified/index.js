import express from "express";
import * as verifiedGamesCollection from "../../../../services/database/collections/verifiedGames";
import serverErrorResponse from "../../../../utilities/serverErrorResponse";
import getObjectIdFromInput from "../../../../utilities/input/getObjectIdFromInput";
import loadAndUpdatePage from "../../../../utilities/loadAndUpdatePage";

const router = express.Router();

router.get("/page", async (request, response) => {
  try {
    const firstPage = await verifiedGamesCollection.getFirstPage();
    if (firstPage.length === 0)
      return response.status(200).json({ success: true, payload: [] });
    const loadedPage = await loadAndUpdatePage(firstPage);

    return response.status(200).json({
      success: true,
      payload: loadedPage,
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.get("/page/:_id", async (request, response) => {
  try {
    const _id = getObjectIdFromInput(request.params);
    const page = await verifiedGamesCollection.getPageByObjectId(_id);
    if (page.length === 0)
      return response.status(200).json({ success: true, payload: [] });
    const loadedPage = await loadAndUpdatePage(page);

    return response.status(200).json({
      success: true,
      payload: loadedPage,
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

export default router;
