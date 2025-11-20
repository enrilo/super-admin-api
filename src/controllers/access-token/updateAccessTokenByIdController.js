import mongoose from "mongoose";
import AccessToken from "../../models/AccessToken.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// ✏️ UPDATE ACCESS TOKEN BY ID (Partial Update)
export const updateAccessTokenByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Access Token ID format", 400);
        }

        // 🔍 Check if Access Token exists
        const accessToken = await AccessToken.findById(id);
        if (!accessToken) {
            return errorResponse(res, "Access Token not found", 404);
        }

        // 🔧 Update Access Token fields
        const updatedAccessToken = await AccessToken.findByIdAndUpdate(id, updateData, {
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
