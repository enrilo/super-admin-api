import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import Consultancies from "../../models/Consultancies.js";

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
    branches: Joi.array().items(
        Joi.object({
            branch_city: Joi.string().required(),
            branch_name: Joi.string().required(),
            branch_address: Joi.string().required(),
            branch_type: Joi.string().required(), // headoffice/branch/franchise
            country_code: Joi.string().required(),
            phone_number: Joi.number().required(),
        })
    ).required(),
});

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
