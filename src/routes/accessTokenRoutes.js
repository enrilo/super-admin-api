import express from "express";
import { getAccessTokensController } from "../controllers/access-token/getAccessTokensController.js";
import { updateAccessTokenByIdController } from "../controllers/access-token/updateAccessTokenByIdController.js";
import { deleteAccessTokenController } from "../controllers/access-token/deleteAccessTokenController.js";
import { getAccessTokenBySuperAdminIdController } from "../controllers/access-token/getAccessTokenBySuperAdminIdController.js";
import { updateAccessTokenBySuperAdminIdController } from "../controllers/access-token/updateAccessTokenBySuperAdminIdController.js";

const accessTokenRoutes = express.Router();

accessTokenRoutes.get("/", getAccessTokensController);
accessTokenRoutes.put("/:id", updateAccessTokenByIdController);
accessTokenRoutes.delete("/:id", deleteAccessTokenController);
accessTokenRoutes.get("/access-token-by-super-admin-id/:super_admin_id", getAccessTokenBySuperAdminIdController);
accessTokenRoutes.put("/access-token-by-super-admin-id/:super_admin_id", updateAccessTokenBySuperAdminIdController);

export default accessTokenRoutes;
