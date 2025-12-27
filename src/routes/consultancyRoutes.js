import express from "express";
import { createConsultancyController } from "../controllers/consultancies/createConsultancyController.js";
import { getAllConsultanciesController } from "../controllers/consultancies/getAllConsultanciesController.js";
import { fetchConsultancyByIdController } from "../controllers/consultancies/fetchConsultancyByIdController.js";
import { updateConsultancyController } from "../controllers/consultancies/updateConsultancyController.js";
import { deleteConsultancyController } from "../controllers/consultancies/deleteConsultancyController.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import { checkSubdomainAvailabilityController } from "../controllers/consultancies/checkSubdomainAvailabilityController.js";
import authorize from "../middlewares/authorize.js";

const consultancyRoutes = express.Router();

consultancyRoutes.post("/", authenticateToken, await authorize(), createConsultancyController);
consultancyRoutes.get("/", authenticateToken, await authorize(), getAllConsultanciesController);
consultancyRoutes.get("/:id", authenticateToken, await authorize(), fetchConsultancyByIdController);
consultancyRoutes.put("/:id", authenticateToken, await authorize(), updateConsultancyController);
consultancyRoutes.delete("/:id", authenticateToken, await authorize(), deleteConsultancyController);
consultancyRoutes.get("/check-subdomain/:subdomain", checkSubdomainAvailabilityController);

export default consultancyRoutes;
