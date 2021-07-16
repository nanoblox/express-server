import fetch from "node-fetch";

export default async function getUniverseIdFromPlaceId(placeId) {
  const response = await fetch(
    `https://api.roblox.com/universes/get-universe-containing-place?placeid=${placeId}`
  );

  const { UniverseId: universeId } = await response.json();

  if (!universeId) throw Error("Invalid placeId");

  return universeId;
}
