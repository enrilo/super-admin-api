import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import PaymentDetails from "../../models/PaymentDetails.js";

// 🧩 GET PAYMENT DETAILS BY ID
export const getPaymentByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Validate input
        const { error, value } = paymentDetailsSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
            });
        }

        // 2️⃣ Check if Payment Details exists
        const paymentDetails = await PaymentDetails.findById(id);
        if (!paymentDetails) {
            return errorResponse(res, "Payment Details not found", 404);
        }

        // 3️⃣ Respond success
        return successResponse(res, "Payment Details found successfully 🚀", {
            success: true,
            payment_details: paymentDetails,
        });
    } catch (err) {
        console.error("❌ Error fetching Payment Details:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
