import fetch from "node-fetch";

export default async function getUniverseDataFromUniverseIds(universeIds) {
  const universeIdsJoined = universeIds.join(",");

  const universesDataResponse = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${universeIdsJoined}`
  );
  const universesData = (await universesDataResponse.json()).data;

  if (!universesData) throw new Error("Unable to connect to Roblox web API");

  const universesThumbnailResponse = await fetch(
    `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeIdsJoined}&size=768x432&format=Png&isCircular=false`
  );
  const universesThumbnailData = (await universesThumbnailResponse.json()).data;

  if (!universesThumbnailData)
    throw new Error("Unable to connect to Roblox web API");

  const universesImportantData = universesData.map((universeData) => ({
    universeId: universeData.id,
    data: {
      rootPlaceId: universeData.rootPlaceId,
      title: universeData.name,
      creatorId: universeData.creator.id,
      creatorName: universeData.creator.name,
      creatorType: universeData.creator.type,
      onlinePlayers: universeData.playing,
      totalVisits: universeData.visits,
      totalFavorites: universeData.favoritedCount,
      thumbnailUrl: universesThumbnailData.filter(
        (universeThumbnailData) =>
          universeData.id === universeThumbnailData.universeId
      )[0]?.thumbnails[0]?.imageUrl,
    },
  }));

  return universesImportantData;
}
