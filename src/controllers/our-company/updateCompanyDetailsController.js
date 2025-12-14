import OurCompany from "../../models/OurCompany.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

// ✏️ UPDATE COMPANY DETAILS (Partial Update)
export const updateCompanyDetailsController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Company ID format", 400);
        }

        // 🔍 Check if Company exists
        const company = await OurCompany.findById(id);
        if (!company) {
            return errorResponse(res, "Company not found", 404);
        }

        // 🔧 Update Company fields
        const updatedCompany = await OurCompany.findByIdAndUpdate(id, updateData, {
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
