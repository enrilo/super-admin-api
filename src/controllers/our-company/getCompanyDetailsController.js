import OurCompany from "../../models/OurCompany.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

// 🧩 GET COMPANY DETAILS
export const getCompanyDetailsController = async (req, res) => {
    try {
        // Find first one and return
        const company = await OurCompany.findOne();

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
