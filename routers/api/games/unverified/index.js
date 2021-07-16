import express from "express";
import {
  isUniverseIdInDb,
  approveByUniverseId,
  rejectByUniverseId,
} from "../../../../services/database/utilities/games";
import * as unverifiedGamesCollection from "../../../../services/database/collections/unverifiedGames";
import Messages from "../../../../utilities/messages";
import getIntegerFromInput from "../../../../utilities/input/getIntegerFromInput";
import getObjectIdFromInput from "../../../../utilities/input/getObjectIdFromInput";
import getGameInformationFromPlaceId from "../../../../utilities/roblox/getGameInformationFromPlaceId";
import serverErrorResponse from "../../../../utilities/serverErrorResponse";
import {
  MINIMUM_PLAYER_VISITS,
  MINIMUM_ACTIVE_PLAYERS,
} from "../../../../utilities/constants";

const router = express.Router();

router.post("/add", async (request, response) => {
  try {
    const placeId = getIntegerFromInput(request.body, "placeId");
    const { universeId, visits, playing } = await getGameInformationFromPlaceId(
      placeId
    );

    if (await isUniverseIdInDb(universeId))
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["submissionFailed"],
          "Game is already verified or being verified"
        ),
      });

    if (visits < MINIMUM_PLAYER_VISITS)
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["submissionFailed"],
          `Game needs to have at least ${MINIMUM_PLAYER_VISITS} total visits to be submitted`
        ),
      });

    if (playing < MINIMUM_ACTIVE_PLAYERS)
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["submissionFailed"],
          `Game needs to have at least ${MINIMUM_ACTIVE_PLAYERS} active players to be submitted`
        ),
      });

    await unverifiedGamesCollection.add({ universeId });
    return response.status(200).json({
      success: true,
      messages: new Messages().add(
        ["submissionSucceeded"],
        "Game has been submitted for verification"
      ),
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.post("/approve", async (request, response) => {
  try {
    const universeId = getIntegerFromInput(request.body, "universeId");

    if (!(await unverifiedGamesCollection.containsUniverseId(universeId)))
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["approvalFailed"],
          "Game does not exists in unverified games database"
        ),
      });

    await approveByUniverseId(universeId);

    return response.status(200).json({
      success: true,
      messages: new Messages().add(
        ["approvalSucceeded"],
        "Game has been successfully approved"
      ),
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.post("/reject", async (request, response) => {
  try {
    const universeId = getIntegerFromInput(request.body, "universeId");

    if (!(await unverifiedGamesCollection.containsUniverseId(universeId)))
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["rejectionFailed"],
          "Game does not exists in unverified games database"
        ),
      });

    await rejectByUniverseId(universeId);

    return response.status(200).json({
      success: true,
      messages: new Messages().add(
        ["rejectionSucceeded"],
        "Game has been successfully rejected"
      ),
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.get("/page", async (request, response) => {
  try {
    const firstPage = await unverifiedGamesCollection.getFirstPage();

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
    const page = await unverifiedGamesCollection.getPageByObjectId(_id);

    return response.status(200).json({
      success: true,
      payload: page,
    });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

export default router;
