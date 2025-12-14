import express from "express";
import { getCompanyDetailsController } from "../controllers/our-company/getCompanyDetailsController.js";
import { updateCompanyDetailsController } from "../controllers/our-company/updateCompanyDetailsController.js";

const ourCompanyRoutes = express.Router();

ourCompanyRoutes.get("/:id", getCompanyDetailsController);
ourCompanyRoutes.put("/:id", updateCompanyDetailsController);

export default ourCompanyRoutes;
