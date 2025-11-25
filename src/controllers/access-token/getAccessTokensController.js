import mongoose from "mongoose";
import AccessToken from "../../models/AccessToken.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// 🧩 GET ACCESS TOKENS with search and filters
export const getAccessTokensController = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        // 🧠 Build dynamic filter
        const filter = {};

        if (search) {
            filter.$or = [
                { token: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;

        // 🧩 Fetch data, and for super admin data only important details
        const accessTokens = await AccessToken.find(filter)
            .populate("super_admin", "full_name company_email role")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalAccessTokens = await AccessToken.countDocuments(filter);

        return successResponse(res, "Access tokens fetched successfully 🚀", {
            message: "Access tokens fetched successfully",
            success: true,
            total: totalAccessTokens,
            currentPage: Number(page),
            totalPages: Math.ceil(totalAccessTokens / limit),
            accessTokens,
        });
    } catch (err) {
        console.error("❌ Error fetching access tokens:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
