import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import Consultancies from "../../models/Consultancies.js";
import ConsultancyBranches from "../../models/ConsultancyBranches.js";

// 🧩 GET CONSULTANCY BY ID
export const fetchConsultancyByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Validate input
        const { error, value } = consultancySchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
            });
        }

        // 2️⃣ Check if Consultancy exists
        const consultancy = await Consultancies.findById(id);
        if (!consultancy) {
            return errorResponse(res, "Consultancy not found", 404);
        }

        // 3️⃣ Fetch Consultancy Branches
        const branches = await ConsultancyBranches.find({ consultancy_id: id });

        // 4️⃣ Respond success
        return successResponse(res, "Consultancy found successfully 🚀", {
            success: true,
            consultancy,
            branches,
        });
    } catch (err) {
        console.error("❌ Error fetching Consultancy:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
