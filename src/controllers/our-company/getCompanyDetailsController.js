import OurCompany from "../../models/OurCompany.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

// 🧩 GET COMPANY DETAILS
export const getCompanyDetailsController = async (req, res) => {
    try {
        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Company ID format", 400);
        }

        // 🔍 Find Company
        const company = await OurCompany.findById(id);

        if (!company) {
            return errorResponse(res, "Company not found", 404);
        }

        // ✅ Return success
        return successResponse(res, "Company found 🚀", {
            success: true,
            company,
        });
    } catch (err) {
        console.error("❌ Error fetching Company:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
