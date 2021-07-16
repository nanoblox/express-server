import fetch from "node-fetch";
import getUniverseIdFromPlaceId from "./getUniverseIdFromPlaceId";

export default async function getGameInformationFromPlaceId(placeId) {
  const universeId = await getUniverseIdFromPlaceId(placeId);

  const response = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${universeId}`
  );

  const universeData = (await response.json()).data[0];

  if (!universeData) throw Error("Invalid universeId");

  const { playing, visits, favoritedCount } = universeData;

  return { universeId, playing, visits, favoritedCount };
}
