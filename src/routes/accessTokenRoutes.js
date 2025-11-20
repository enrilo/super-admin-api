import express from "express";
import { getAccessTokensController } from "../controllers/access-token/getAccessTokensController.js";
import { updateAccessTokenByIdController } from "../controllers/access-token/updateAccessTokenByIdController.js";
import { deleteAccessTokenController } from "../controllers/access-token/deleteAccessTokenController.js";

const accessTokenRoutes = express.Router();

accessTokenRoutes.get("/", getAccessTokensController);
accessTokenRoutes.put("/:id", updateAccessTokenByIdController);
accessTokenRoutes.delete("/:id", deleteAccessTokenController);

export default accessTokenRoutes;
