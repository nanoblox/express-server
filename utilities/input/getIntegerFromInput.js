export default function getIntegerFromInput(input) {
  const integer = parseInt(input);

  if (isNaN(integer) || !isFinite(integer))
    throw new TypeError("Invalid input");

  return integer;
}
