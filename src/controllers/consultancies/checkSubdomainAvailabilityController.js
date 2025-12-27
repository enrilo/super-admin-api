import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Consultancies from "../../models/Consultancies.js";

// 🧩 CHECK SUBDOMAIN AVAILABILITY
export const checkSubdomainAvailabilityController = async (req, res) => {
    try {
        const { subdomain } = req.params;

        // 1️⃣ Check if subdomain exists
        const consultancy = await Consultancies.findOne({ subdomain });
        if (consultancy) {
            return errorResponse(res, "Subdomain already exists", 409);
        }

        // 2️⃣ Respond success
        return successResponse(res, "Subdomain is available 🚀", {
            success: true,
            available: true,
        });
    } catch (err) {
        console.error("❌ Error checking subdomain availability:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
