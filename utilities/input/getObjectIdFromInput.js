import mongodb from "mongodb";

export default function getObjectIdFromInput(input) {
  return new mongodb.ObjectId(input._id);
}
