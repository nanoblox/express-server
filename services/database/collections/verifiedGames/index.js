import db from "../..";

import { VERIFIED_PAGE_SIZE } from "../../../../utilities/constants";

const collection = db.collection("verifiedGames");

export async function add(game) {
  game.verifiedDate = new Date();
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

export async function getFirstPage() {
  return await collection.find({}).limit(VERIFIED_PAGE_SIZE).toArray();
}

export async function getPageByObjectId(objectId) {
  return await collection
    .aggregate([
      { $match: { _id: { $gt: objectId } } },
      { $limit: VERIFIED_PAGE_SIZE },
    ])
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
