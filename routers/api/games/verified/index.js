import express from "express";
import * as verifiedGamesCollection from "../../../../services/database/collections/verifiedGames";
import serverErrorResponse from "../../../../utilities/serverErrorResponse";
import loadAndUpdatePage from "../../../../utilities/loadAndUpdatePage";
import useCache from "../../../../utilities/useCache";
import getIntegerFromInput from "../../../../utilities/input/getIntegerFromInput";

const router = express.Router();

router.get("/page/recentlyadded", async (request, response) => {
  try {
    const payload = await useCache("recentlyadded", async () => {
      const page = await verifiedGamesCollection.getRecentlyAddedFirstPage();
      if (page.length === 0)
        return { payload: [], meta: { shouldCache: false } };

      const loadedPage = await loadAndUpdatePage(page);
      return { payload: loadedPage, meta: { shouldCache: true } };
    });

    return response.status(200).json({ success: true, payload });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.get("/page/mostpopular", async (request, response) => {
  try {
    const payload = await useCache("mostpopular", async () => {
      const page = await verifiedGamesCollection.getMostPopularFirstPage();
      if (page.length === 0)
        return { payload: [], meta: { shouldCache: false } };

      const loadedPage = await loadAndUpdatePage(page);
      return { payload: loadedPage, meta: { shouldCache: true } };
    });

    return response.status(200).json({ success: true, payload });
  } catch (error) {
    return serverErrorResponse(error, response);
  }
});

router.get(
  "/page/recentlyadded/:lastVerifiedDate",
  async (request, response) => {
    try {
      const lastVerifiedDate = getIntegerFromInput(
        request.params.lastVerifiedDate
      );

      const payload = await useCache(
        `recentlyadded.${lastVerifiedDate}`,
        async () => {
          const page = await verifiedGamesCollection.getRecentlyAddedPage(
            lastVerifiedDate
          );
          if (page.length === 0)
            return { payload: [], meta: { shouldCache: false } };

          const loadedPage = await loadAndUpdatePage(page);
          return { payload: loadedPage, meta: { shouldCache: true } };
        }
      );

      return response.status(200).json({ success: true, payload });
    } catch (error) {
      return serverErrorResponse(error, response);
    }
  }
);

router.get(
  "/page/mostpopular/:lastOnlinePlayers",
  async (request, response) => {
    try {
      const lastOnlinePlayers = getIntegerFromInput(
        request.params.lastOnlinePlayers
      );

      const payload = await useCache(
        `mostpopular.${lastOnlinePlayers}`,
        async () => {
          const page = await verifiedGamesCollection.getMostPopularPage(
            lastOnlinePlayers
          );
          if (page.length === 0)
            return { payload: [], meta: { shouldCache: false } };

          const loadedPage = await loadAndUpdatePage(page);
          return { payload: loadedPage, meta: { shouldCache: true } };
        }
      );

      return response.status(200).json({ success: true, payload });
    } catch (error) {
      return serverErrorResponse(error, response);
    }
  }
);

router.get(
  "/page/search/:searchString/:pageNumber",
  async (request, response) => {
    try {
      const { searchString } = request.params;
      const pageNumber = parseInt(request.params.pageNumber);

      const payload = await useCache(
        `search.${searchString}.${pageNumber}`,
        async () => {
          const page = await verifiedGamesCollection.getSearchPage(
            searchString,
            pageNumber
          );
          if (page.length === 0)
            return { payload: [], meta: { shouldCache: false } };

          const loadedPage = await loadAndUpdatePage(page);
          return { payload: loadedPage, meta: { shouldCache: true } };
        }
      );

      return response.status(200).json({ success: true, payload });
    } catch (error) {
      return serverErrorResponse(error, response);
    }
  }
);

export default router;
