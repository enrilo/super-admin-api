import express from "express";
import { createPaymentController } from "../controllers/payment-method/createPaymentController.js";
import { getAllPaymentsController } from "../controllers/payment-method/getAllPaymentsController.js";
import { getPaymentByIdController } from "../controllers/payment-method/getPaymentByIdController.js";
import { updatePaymentController } from "../controllers/payment-method/updatePaymentController.js";
import { deletePaymentController } from "../controllers/payment-method/deletePaymentController.js";

const paymentMethodRoutes = express.Router();

paymentMethodRoutes.post("/", createPaymentController);
paymentMethodRoutes.get("/", getAllPaymentsController);
paymentMethodRoutes.get("/:id", getPaymentByIdController);
paymentMethodRoutes.put("/:id", updatePaymentController);
paymentMethodRoutes.delete("/:id", deletePaymentController);

export default paymentMethodRoutes;
