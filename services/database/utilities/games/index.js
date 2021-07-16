import * as unverifiedGames from "../../collections/unverifiedGames";
import * as verifiedGames from "../../collections/verifiedGames";

export async function isUniverseIdInDb(universeId) {
  const inUnverified = await unverifiedGames.containsUniverseId(universeId);
  if (inUnverified) return true;

  const inVerified = await verifiedGames.containsUniverseId(universeId);
  if (inVerified) return true;

  return false;
}

export async function approveByGameId(universeId) {
  const game = await unverifiedGames.getByUniverseId(universeId);
  if (game) await verifiedGames.add(game);
}

export async function rejectByUniverseId(universeId) {
  await unverifiedGames.removeByUniverseId(universeId);
}
