import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import Consultancies from "../../models/Consultancies.js";

// 🧩 GET ALL CONSULTANCIES with search and filters
export const getAllConsultanciesController = async (req, res) => {
    try {
        const { search, name, page = 1, limit = 10 } = req.query;

        // 🧠 Build dynamic filter
        const filter = {};

        if (name) filter.name = { $regex: name, $options: "i" };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;

        // 🧩 Fetch data, and for super admin data only important details
        const consultancies = await Consultancies.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalConsultancies = await Consultancies.countDocuments(filter);

        return successResponse(res, "Consultancies fetched successfully 🚀", {
            message: "Consultancies fetched successfully",
            success: true,
            total: totalConsultancies,
            currentPage: Number(page),
            totalPages: Math.ceil(totalConsultancies / limit),
            consultancies,
        });
    } catch (err) {
        console.error("❌ Error fetching Consultancies:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
