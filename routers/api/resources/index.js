import express from "express";
import * as resourcesCollection from "../../../services/database/collections/resources";
import serverErrorResponse from "../../../utilities/serverErrorResponse";
import useCache from "../../../utilities/useCache";
import mongodb from "mongodb";

const router = express.Router();

router.get("/page", async (request, response) => {
  try {
    const payload = await useCache("resources", async () => {
      const page = await resourcesCollection.GetFirstPage();
      return { payload: page, meta: { shouldCache: true } };
    });

    return response.status(200).json({ success: true, payload });
  } catch (error) {
    serverErrorResponse(error, response);
  }
});

router.get("/page/:objectId", async (request, response) => {
  try {
    const _id = new mongodb.ObjectId(request.params.objectId);

    const payload = await useCache("resources", async () => {
      const page = await resourcesCollection.GetPageByObjectId(_id);
      return { payload: page, meta: { shouldCache: true } };
    });

    return response.status(200).json({ success: true, payload });
  } catch (error) {
    serverErrorResponse(error, response);
  }
});

export default router;
