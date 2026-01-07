import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import Consultancies from "../../models/Consultancies.js";
import ConsultancyBranches from "../../models/ConsultancyBranches.js";

// 🗑️ DELETE CONSULTANCY BY ID
export const deleteConsultancyController = async (req, res) => {
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

        // 3️⃣ Delete Consultancy Branches
        await ConsultancyBranches.deleteMany({ consultancy_id: id });

        // 4️⃣ Delete Consultancy
        await consultancy.deleteOne();

        // 5️⃣ Respond success
        return successResponse(res, "Consultancy deleted successfully 🚀", {
            success: true,
            deletedConsultancyId: id,
        });
    } catch (err) {
        console.error("❌ Error deleting Consultancy:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
