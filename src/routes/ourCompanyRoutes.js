import express from "express";
import { getCompanyDetailsController } from "../controllers/our-company/getCompanyDetailsController.js";
import { updateCompanyDetailsController } from "../controllers/our-company/updateCompanyDetailsController.js";

const ourCompanyRoutes = express.Router();

ourCompanyRoutes.get("/", getCompanyDetailsController);
ourCompanyRoutes.put("/", updateCompanyDetailsController);

export default ourCompanyRoutes;
