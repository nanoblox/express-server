import express from "express";
import { isUniverseIdInDb } from "../../../../services/database/utilities/games";
import * as unverifiedGamesCollection from "../../../../services/database/collections/unverifiedGames";
import Messages from "../../../../utilities/messages";
import getPlaceIdFromRequestBody from "../../../../utilities/getPlaceIdFromRequestBody";
import getGameInformationFromPlaceId from "../../../../utilities/roblox/getGameInformationFromPlaceId";

import notImplemented from "../../../../middlewares/notImplemented";
import {
  MINIMUM_PLAYER_VISITS,
  MINIMUM_ACTIVE_PLAYERS,
} from "../../../../utilities/constants";

const router = express.Router();

router.post("/add", async (request, response) => {
  try {
    const placeId = getPlaceIdFromRequestBody(request.body);
    const { universeId, visits, playing } = await getGameInformationFromPlaceId(
      placeId
    );

    if (await isUniverseIdInDb(universeId))
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["submissionRejected"],
          "Game is already verified or being verified"
        ),
      });

    if (visits < MINIMUM_PLAYER_VISITS)
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["submissionRejected"],
          `Game needs to have at least ${MINIMUM_PLAYER_VISITS} total visits to be submitted`
        ),
      });

    if (playing < MINIMUM_ACTIVE_PLAYERS)
      return response.status(200).json({
        success: false,
        errors: new Messages().add(
          ["submissionRejected"],
          `Game needs to have at least ${MINIMUM_ACTIVE_PLAYERS} active players to be submitted`
        ),
      });

    await unverifiedGamesCollection.add({ universeId });
    return response.status(200).json({
      success: false,
      messages: new Messages().add(
        ["submissionApproved"],
        "Game has been submitted for verification"
      ),
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      errors: new Messages().add(["server"], error.message),
    });
  }
});

router.post("/remove", notImplemented, async (request, response) => {});

router.post("/approve", notImplemented, async (request, response) => {});

router.post("/decline", notImplemented, async (request, response) => {});

router.get("/page", notImplemented, async (request, response) => {});

router.get("/page/:_id", notImplemented, async (request, response) => {});

export default router;
