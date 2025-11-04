import mongoose from "mongoose";
import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// ✏️ UPDATE SUPER ADMIN BY ID (Partial Update)
export const updateSuperAdminController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Super Admin ID format", 400);
        }

        // 🔍 Check if Super Admin exists
        const superAdmin = await SuperAdmin.findById(id);
        if (!superAdmin) {
            return errorResponse(res, "Super Admin not found", 404);
        }

        // 🔧 Update Super Admin fields
        const updatedSuperAdmin = await SuperAdmin.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        // ✅ Success response
        return successResponse(res, "Super Admin updated successfully 🚀", {
            success: true,
            superAdmin: updatedSuperAdmin,
        });
    } catch (err) {
        console.error("❌ Error updating Super Admin:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
