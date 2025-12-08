import AccessToken from "../../models/AccessToken.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

// 🧩 GET ACCESS TOKENS BY SUPER ADMIN ID
export const getAccessTokenBySuperAdminIdController = async (req, res) => {
    try {
        const { super_admin_id } = req.params;

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(super_admin_id)) {
            return errorResponse(res, "Invalid Super Admin ID format", 400);
        }

        // 🔍 Find Access Token
        const accessToken = await AccessToken.findOne({ super_admin_id });

        if (!accessToken) {
            return errorResponse(res, "Access Token not found", 404);
        }

        // ✅ Return success
        return successResponse(res, "Access Token found 🚀", {
            success: true,
            accessToken,
        });
    } catch (err) {
        console.error("❌ Error fetching Access Token:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
