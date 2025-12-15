import OurCompany from "../../models/OurCompany.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

// ✏️ UPDATE COMPANY DETAILS (Partial Update)
export const updateCompanyDetailsController = async (req, res) => {
    try {
        // Update in the first one
        const company = await OurCompany.findOne();
        if (!company) {
            return errorResponse(res, "Company not found", 404);
        }

        // 🔧 Update Company fields
        const updatedCompany = await OurCompany.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true,
        });

        // ✅ Success response
        return successResponse(res, "Company updated successfully 🚀", {
            success: true,
            company: updatedCompany,
        });
    } catch (err) {
        console.error("❌ Error updating Company:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
