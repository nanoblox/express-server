import db from "../..";

import { PAGE_SIZE } from "../../../../utilities/constants";

const collection = db.collection("resources");

export async function GetFirstPage() {
  return await collection.find({}).limit(PAGE_SIZE).toArray();
}

export async function GetPageByObjectId(objectId) {
  return await collection
    .find({ _id: { $gt: objectId } })
    .limit(PAGE_SIZE)
    .toArray();
}
