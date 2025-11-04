import mongoose from "mongoose";
import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// 🔍 GET SUPER ADMIN BY ID
export const getSuperAdminByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Super Admin ID format", 400);
        }

        // 🔍 Find Super Admin (no password field in this model)
        const superAdmin = await SuperAdmin.findById(id);

        if (!superAdmin) {
            return errorResponse(res, "Super Admin not found", 404);
        }

        // ✅ Return success
        return successResponse(res, "Super Admin found 🚀", {
            success: true,
            superAdmin,
        });
    } catch (err) {
        console.error("❌ Error fetching Super Admin:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
