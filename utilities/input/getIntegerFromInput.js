export default function getIntegerFromInput(input, field) {
  const integer = parseInt(input[field]);

  if (isNaN(integer) || !isFinite(integer))
    throw new TypeError("Invalid input");

  return integer;
}
