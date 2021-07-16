export default function getPlaceIdFromRequestBody(requestBody) {
  const { placeId } = requestBody;

  if (isNaN(placeId) || !isFinite(placeId))
    throw new TypeError("Invalid PlaceId");

  return placeId;
}
