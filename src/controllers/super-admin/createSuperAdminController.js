import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";

// ✅ Joi Validation Schema
const superAdminSchema = Joi.object({
    // Basic Info
    photo_url: Joi.string().allow(""),
    full_name: Joi.string().min(3).required(),
    country_code: Joi.string().required(),
    phone: Joi.number().required(),
    company_email: Joi.string().email().required(),
    email: Joi.string().email().allow(""),
    position: Joi.string().required(),
    password: Joi.string().required(),

    // Address Info
    street_1: Joi.string().allow(""),
    street_2: Joi.string().allow(""),
    city: Joi.string().allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().allow(""),
    zipcode: Joi.string().allow(""),

    // Emergency Contact
    emergency_contact: Joi.object({
        name: Joi.string().required(),
        relation: Joi.string().required(),
        country_code: Joi.string().required(),
        phone: Joi.number().required(),
    }).required(),

    // Documents
    documents: Joi.array().items(
        Joi.object({
            name: Joi.string().allow(""),
            url: Joi.string().uri().allow(""),
            number: Joi.string().allow(""),
            uploaded_at: Joi.date().default(Date.now),
        })
    ).allow(null),

    // Access Control
    is_active: Joi.boolean().default(true),
    last_login: Joi.date().allow(null),

    // Metadata
    created_by: Joi.string().hex().length(24).allow(null),
    notes: Joi.string().allow(""),
});


// ✅ Create Super Admin Controller
export const createSuperAdminController = async (req, res) => {
    try {
        // 1️⃣ Validate input
        // const { error, value } = superAdminSchema.validate(req.body, { abortEarly: false });
        // if (error) {
        //     console.log("Create superadmin error: ", error);
        //     return res.status(400).json({
        //         success: false,
        //         message: "Validation failed",
        //         details: error.details.map((d) => d.message),
        //     });
        // }

        // 2️⃣ Check for existing SuperAdmin (by company email)
        const existingAdmin = await SuperAdmin.findOne({ company_email: req.body.company_email });
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: "A Super Admin with this company email already exists",
            });
        }

        // 3️⃣ Create SuperAdmin
        const newSuperAdmin = new SuperAdmin(req.body);
        await newSuperAdmin.save();

        // 4️⃣ Respond success
        return successResponse(res, "Super Admin created successfully 🚀", {
            success: true,
            super_admin: newSuperAdmin,
        });
    } catch (err) {
        console.error("❌ Error creating SuperAdmin:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
