import express from "express";
import * as verifiedGamesCollection from "../../../../services/database/collections/verifiedGames";
import serverErrorResponse from "../../../../utilities/serverErrorResponse";
import getObjectIdFromInput from "../../../../utilities/input/getObjectIdFromInput";

const router = express.Router();

router.get("/page", async (request, response) => {
  try {
    const firstPage = await verifiedGamesCollection.getFirstPage();

    return response.status(200).json({
      success: true,
      payload: firstPage,
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.get("/page/:_id", async (request, response) => {
  try {
    const _id = getObjectIdFromInput(request.params);
    const page = await verifiedGamesCollection.getPageByObjectId(_id);

    return response.status(200).json({
      success: true,
      payload: page,
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

export default router;
