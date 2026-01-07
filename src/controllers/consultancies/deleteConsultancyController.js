import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import Consultancies from "../../models/Consultancies.js";
import ConsultancyBranches from "../../models/ConsultancyBranches.js";

const consultancySchema = Joi.object({
    photo_url: Joi.string().allow(""),
    name: Joi.string().min(3).required(),
    company_website: Joi.string().allow(""),
    gst_number: Joi.string().allow(""),
    linkedin_url: Joi.string().allow(""),
    facebook_url: Joi.string().allow(""),
    instagram_url: Joi.string().allow(""),
    is_single_branch: Joi.boolean().default(true),
    subdomain: Joi.string().allow(""),
    office_details: Joi.array().items(
        Joi.object({
            office_city: Joi.string().required(),
            office_name: Joi.string().required(),
            office_address: Joi.string().required(),
            office_type: Joi.string().required(), // headoffice/branch/franchise
            country_code: Joi.string().required(),
            phone_number: Joi.number().required(),
        })
    ).required(),
});

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
