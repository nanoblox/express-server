export default function getIntegerFromRequestBody(requestBody, field) {
  const integer = parseInt(requestBody[field]);

  if (isNaN(integer) || !isFinite(integer))
    throw new TypeError("Invalid input");

  return integer;
}
