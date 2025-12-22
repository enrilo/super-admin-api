
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

// ✅ Create Payment Details Controller
export const createPaymentController = async (req, res) => {
    try {
        // 1️⃣ Validate input
        const { error, value } = paymentDetailsSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
            });
        }

        // 2️⃣ Create Payment Details
        const newPaymentDetails = new PaymentDetails(req.body);
        await newPaymentDetails.save();

        // 3️⃣ Respond success
        return successResponse(res, "Payment Details created successfully 🚀", {
            success: true,
            payment_details: newPaymentDetails,
        });
    } catch (err) {
        console.error("❌ Error creating Payment Details:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
