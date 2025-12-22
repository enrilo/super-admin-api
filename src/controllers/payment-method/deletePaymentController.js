
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import PaymentDetails from "../../models/PaymentDetails.js";

export const deletePaymentController = async (req, res) => {
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

        // 3️⃣ Delete Payment Details
        await paymentDetails.deleteOne();

        // 4️⃣ Respond success
        return successResponse(res, "Payment Details deleted successfully 🚀", {
            success: true,
            deletedPaymentDetailsId: id,
        });
    } catch (err) {
        console.error("❌ Error deleting Payment Details:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
