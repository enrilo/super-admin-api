import express from "express";
import { createConsultancyController } from "../controllers/consultancies/createConsultancyController.js";
import { getAllConsultanciesController } from "../controllers/consultancies/getAllConsultanciesController.js";
import { fetchConsultancyByIdController } from "../controllers/consultancies/fetchConsultancyByIdController.js";
import { updateConsultancyController } from "../controllers/consultancies/updateConsultancyController.js";
import { deleteConsultancyController } from "../controllers/consultancies/deleteConsultancyController.js";

const consultancyRoutes = express.Router();

consultancyRoutes.post("/", createConsultancyController);
consultancyRoutes.get("/", getAllConsultanciesController);
consultancyRoutes.get("/:id", fetchConsultancyByIdController);
consultancyRoutes.put("/:id", updateConsultancyController);
consultancyRoutes.delete("/:id", deleteConsultancyController);

export default consultancyRoutes;
