import db from "../..";

import { VERIFIED_PAGE_SIZE } from "../../../../utilities/constants";

const collection = db.collection("verifiedGames");

export async function add(game) {
  game.verifiedDate = Date.now();
  const { ops: addedGame } = await collection.insertOne(game);

  return addedGame;
}

export async function removeByUniverseId(universeId) {
  await collection.deleteOne({ universeId });
}

export async function getByUniverseId(universeId) {
  return await collection.findOne({ universeId });
}

export async function containsUniverseId(universeId) {
  return await collection.find({ universeId }).limit(1).hasNext();
}

export async function getRecentlyAddedFirstPage() {
  return await collection
    .find({})
    .sort({ verifiedDate: -1 })
    .limit(VERIFIED_PAGE_SIZE)
    .toArray();
}

export async function getRecentlyAddedPage(lastVerifiedDate) {
  return await collection
    .find({ verifiedDate: { $lt: lastVerifiedDate } })
    .sort({ verifiedDate: -1 })
    .limit(VERIFIED_PAGE_SIZE)
    .toArray();
}

export async function getMostPopularFirstPage() {
  return await collection
    .find({})
    .sort({ "data.onlinePlayers": -1 })
    .limit(VERIFIED_PAGE_SIZE)
    .toArray();
}

export async function getMostPopularPage(lastOnlinePlayers) {
  return await collection
    .find({ "data.onlinePlayers": { $lt: lastOnlinePlayers } })
    .sort({ "data.onlinePlayers": -1 })
    .limit(VERIFIED_PAGE_SIZE)
    .toArray();
}

export async function updateUniverseDataByObjectId(objectId, data) {
  return await collection.updateOne(
    { _id: objectId },
    {
      $set: {
        data,
        lastDataUpdate: Date.now(),
      },
    }
  );
}
