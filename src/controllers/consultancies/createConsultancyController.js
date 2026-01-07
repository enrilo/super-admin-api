import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";
import Consultancies from "../../models/Consultancies.js";
import ConsultancyBranches from "../../models/ConsultancyBranches.js";

// ✅ Joi Validation Schema (FIXED)
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
            office_name: Joi.string().required(),
            office_city: Joi.string().required(),
            office_address: Joi.string().required(),
            office_type: Joi.string().required(), // headoffice/branch/franchise
            country_code: Joi.string().required(),
            phone_number: Joi.number().required(),
        })
    ).required(),
});

// ✅ Create Consultancy Controller
export const createConsultancyController = async (req, res) => {
    try {
        // 1️⃣ Validate input
        const { error, value } = consultancySchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
            });
        }

        // 2️⃣ Create Consultancy
        const newConsultancy = new Consultancies(req.body);
        await newConsultancy.save();

        // 3️⃣ Create Consultancy Branches
        // const branches = req.body.branches.map((branch) => ({ ...branch, consultancy_id: newConsultancy._id }));
        // await ConsultancyBranches.insertMany(branches);

        // 4️⃣ Respond success
        return successResponse(res, "Consultancy created successfully 🚀", {
            success: true,
            consultancy: newConsultancy,
        });
    } catch (err) {
        console.error("❌ Error creating Consultancy:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
