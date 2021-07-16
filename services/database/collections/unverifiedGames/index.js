import db from "../..";

import { PAGE_SIZE } from "../../../../utilities/constants";

const collection = db.collection("unverifiedGames");

export async function add(game) {
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
  return await collection.find({}).limit(PAGE_SIZE).toArray();
}

export async function getPageByObjectId(objectId) {
  return await collection
    .aggregate([{ $match: { _id: { $gt: objectId } } }, { $limit: PAGE_SIZE }])
    .toArray();
}
