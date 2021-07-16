import fetch from "node-fetch";

export default async function getGameInformationFromPlaceId(placeId) {
  const universeIdResponse = await fetch(
    `https://api.roblox.com/universes/get-universe-containing-place?placeid=${placeId}`
  );

  const { UniverseId: universeId } = await universeIdResponse.json();

  if (!universeId) throw Error("Invalid placeId");

  const universeDataResponse = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${universeId}`
  );

  const universeData = (await universeDataResponse.json()).data[0];

  if (!universeData) throw Error("Invalid universeId");

  const { playing, visits, favoritedCount } = universeData;

  return { universeId, playing, visits, favoritedCount };
}
