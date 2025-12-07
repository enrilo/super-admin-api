import AccessToken from "../../models/AccessToken.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

// ✏️ UPDATE ACCESS TOKEN BY SUPER ADMIN ID (Partial Update)
export const updateAccessTokenBySuperAdminIdController = async (req, res) => {
    try {
        const { super_admin_id } = req.params;
        const updateData = { ...req.body };
        
        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(super_admin_id)) {
            return errorResponse(res, "Invalid Super Admin ID format", 400);
        }

        // 🔍 Check if Access Token exists
        const accessToken = await AccessToken.findOne({ super_admin_id });
        if (!accessToken) {
            return errorResponse(res, "Access Token not found", 404);
        }

        // 🔧 Update Access Token fields
        const updatedAccessToken = await AccessToken.findOneAndUpdate({ super_admin_id }, updateData, {
            new: true,
            runValidators: true,
        });

        // ✅ Success response
        return successResponse(res, "Access Token updated successfully 🚀", {
            success: true,
            accessToken: updatedAccessToken,
        });
    } catch (err) {
        console.error("❌ Error updating Access Token:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
