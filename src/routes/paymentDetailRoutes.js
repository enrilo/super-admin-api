import express from "express";
import { createPaymentController } from "../controllers/payment-details/createPaymentController.js";
import { getAllPaymentsController } from "../controllers/payment-details/getAllPaymentsController.js";
import { getPaymentByIdController } from "../controllers/payment-details/getPaymentByIdController.js";
import { updatePaymentController } from "../controllers/payment-details/updatePaymentController.js";
import { deletePaymentController } from "../controllers/payment-details/deletePaymentController.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import authorize from "../middlewares/authorize.js";

const paymentMethodRoutes = express.Router();

paymentMethodRoutes.post("/", authenticateToken, await authorize(), createPaymentController);
paymentMethodRoutes.get("/", authenticateToken, await authorize(), getAllPaymentsController);
paymentMethodRoutes.get("/:id", authenticateToken, await authorize(), getPaymentByIdController);
paymentMethodRoutes.put("/:id", authenticateToken, await authorize(), updatePaymentController);
paymentMethodRoutes.delete("/:id", authenticateToken, await authorize(), deletePaymentController);

export default paymentMethodRoutes;
