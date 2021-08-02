import getUniverseDataFromUniverseIds from "./roblox/getUniverseDataFromUniverseIds";
import { updateUniverseDataByObjectId } from "../services/database/collections/verifiedGames";

export default async function loadAndUpdatePage(page) {
  const data = await getUniverseDataFromUniverseIds(
    page.map((universeRecord) => universeRecord.universeId)
  );

  const loadedPage = page.map((universeRecord) => ({
    _id: universeRecord._id,
    universeId: universeRecord.universeId,
    data: data.filter(
      (datum) => datum.universeId === universeRecord.universeId
    )[0]?.data,
  }));

  loadedPage.forEach(
    async (universeRecord) =>
      await updateUniverseDataByObjectId(
        universeRecord._id,
        universeRecord.data
      )
  );

  return loadedPage;
}
