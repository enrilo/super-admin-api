
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import PaymentDetails from "../../models/PaymentDetails.js";

// ✅ Joi Validation Schema
const paymentDetailsSchema = Joi.object({
    consultancy_id: Joi.string().required(),
    consultancy_name: Joi.string().required(),
    rate: Joi.number().required(),
    duration_in_months: Joi.number().required(),
    subtotal: Joi.number().required(),
    is_discount_available: Joi.boolean().default(false),
    discount_amount: Joi.number().default(0),
    net_total: Joi.number().required(),
    gst_amount: Joi.number().required(),
    grand_total: Joi.number().required(),
    payment_status: Joi.string().valid("pending", "partial", "full").default("pending"),
    payment_received: Joi.number().default(0),
    pending_payment: Joi.number().default(0),
    from_date: Joi.date().required(),
    to_date: Joi.date().required(),
});

// ✏️ UPDATE PAYMENT DETAILS BY ID (Partial Update)
export const updatePaymentController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

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

        // 3️⃣ Update Payment Details fields
        const updatedPaymentDetails = await PaymentDetails.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        // 4️⃣ Respond success
        return successResponse(res, "Payment Details updated successfully 🚀", {
            success: true,
            payment_details: updatedPaymentDetails,
        });
    } catch (err) {
        console.error("❌ Error updating Payment Details:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
