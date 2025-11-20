import mongoose from "mongoose";
import AccessToken from "../../models/AccessToken.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// 🗑️ DELETE ACCESS TOKEN BY ID
export const deleteAccessTokenController = async (req, res) => {
    try {
        const { id } = req.params;

        // 🧩 Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Access Token ID format", 400);
        }

        // 🔍 Check if Access Token exists
        const accessToken = await AccessToken.findById(id);
        if (!accessToken) {
            return errorResponse(res, "Access Token not found", 404);
        }

        // 🗑️ Delete Access Token
        await accessToken.deleteOne();

        // ✅ Respond success
        return successResponse(res, "Access Token deleted successfully 🚀", {
            success: true,
            deletedAccessTokenId: id,
        });
    } catch (err) {
        console.error("❌ Error deleting Access Token:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
