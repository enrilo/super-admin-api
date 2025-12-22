import express from "express";
import { createPaymentController } from "../controllers/payment-details/createPaymentController.js";
import { getAllPaymentsController } from "../controllers/payment-details/getAllPaymentsController.js";
import { getPaymentByIdController } from "../controllers/payment-details/getPaymentByIdController.js";
import { updatePaymentController } from "../controllers/payment-details/updatePaymentController.js";
import { deletePaymentController } from "../controllers/payment-details/deletePaymentController.js";

const paymentMethodRoutes = express.Router();

paymentMethodRoutes.post("/", createPaymentController);
paymentMethodRoutes.get("/", getAllPaymentsController);
paymentMethodRoutes.get("/:id", getPaymentByIdController);
paymentMethodRoutes.put("/:id", updatePaymentController);
paymentMethodRoutes.delete("/:id", deletePaymentController);

export default paymentMethodRoutes;
