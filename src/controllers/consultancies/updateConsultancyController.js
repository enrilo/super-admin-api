import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import Consultancies from "../../models/Consultancies.js";

// ✅ Joi Validation Schema
const consultancySchema = Joi.object({
    photo_url: Joi.string().allow(""),
    name: Joi.string().min(3).required(),
    gst_number: Joi.string().allow(""),
    linkedin_url: Joi.string().allow(""),
    facebook_url: Joi.string().allow(""),
    instagram_url: Joi.string().allow(""),
    is_single_branch: Joi.boolean().default(true),
    office_details: Joi.array().items(
        Joi.object({
            office_name: Joi.string().allow(""),
            office_address: Joi.string().allow(""),
            office_type: Joi.string().allow(""),
            country_code: Joi.string().allow(""),
            phone_number: Joi.number().allow(""),
        })
    ).allow(null),
});

// ✏️ UPDATE CONSULTANCY BY ID (Partial Update)
export const updateConsultancyController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

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

        // 3️⃣ Update Consultancy fields
        const updatedConsultancy = await Consultancies.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        // 4️⃣ Respond success
        return successResponse(res, "Consultancy updated successfully 🚀", {
            success: true,
            consultancy: updatedConsultancy,
        });
    } catch (err) {
        console.error("❌ Error updating Consultancy:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
