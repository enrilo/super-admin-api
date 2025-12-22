import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import PaymentDetails from "../../models/PaymentDetails.js";

// 🧩 GET ALL PAYMENT DETAILS with search and filters
export const getAllPaymentsController = async (req, res) => {
    try {
        const { search, consultancy_id, page = 1, limit = 10 } = req.query;

        // 🧠 Build dynamic filter
        const filter = {};

        if (consultancy_id) filter.consultancy_id = consultancy_id;

        if (search) {
            filter.$or = [
                { consultancy_name: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;

        // 🧩 Fetch data, and for super admin data only important details
        const paymentDetails = await PaymentDetails.find(filter)
            .populate("consultancy_id", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalPaymentDetails = await PaymentDetails.countDocuments(filter);

        return successResponse(res, "Payment Details fetched successfully 🚀", {
            message: "Payment Details fetched successfully",
            success: true,
            total: totalPaymentDetails,
            currentPage: Number(page),
            totalPages: Math.ceil(totalPaymentDetails / limit),
            paymentDetails,
        });
    } catch (err) {
        console.error("❌ Error fetching Payment Details:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
