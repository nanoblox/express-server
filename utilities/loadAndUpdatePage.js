import getUniverseDataFromUniverseIds from "./roblox/getUniverseDataFromUniverseIds";
import { updateUniverseDataByObjectId } from "../services/database/collections/verifiedGames";
import { DATA_UPDATE_INTERVAL } from "./constants";

export default async function loadAndUpdatePage(page) {
  const universeRecordsRequiringUpdate = page.filter(
    (universeRecord) =>
      !universeRecord.lastDataUpdate ||
      (Date.now() - universeRecord.lastDataUpdate) / 1000 > DATA_UPDATE_INTERVAL
  );

  if (universeRecordsRequiringUpdate.length === 0) {
    return page;
  }

  const universeRecordsNotRequiringUpdate = page.filter((universeRecord) =>
    universeRecordsRequiringUpdate.every((requiringUpdateUniverseRecord) => {
      universeRecord.universeId !== requiringUpdateUniverseRecord.universeId;
    })
  );

  const data = await getUniverseDataFromUniverseIds(
    universeRecordsRequiringUpdate.map(
      (universeRecord) => universeRecord.universeId
    )
  );

  const loadedUniverseRecords = universeRecordsRequiringUpdate.map(
    (universeRecord) => ({
      _id: universeRecord._id,
      universeId: universeRecord.universeId,
      data: data.filter(
        (datum) => datum.universeId === universeRecord.universeId
      )[0]?.data,
    })
  );

  loadedUniverseRecords.forEach(
    async (universeRecord) =>
      await updateUniverseDataByObjectId(
        universeRecord._id,
        universeRecord.data
      )
  );

  const loadedPage = [
    ...universeRecordsNotRequiringUpdate,
    ...loadedUniverseRecords,
  ];

  return loadedPage;
}
