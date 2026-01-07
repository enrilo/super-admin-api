import Joi from "joi";
import mongoose from "mongoose";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Consultancies from "../../models/Consultancies.js";
import ConsultancyBranches from "../../models/ConsultancyBranches.js";

/**
 * =========================
 * Joi Validation Schema
 * =========================
 * - Allows partial consultancy updates
 * - Explicit arrays for create / update / delete branches
 */
const consultancyUpdateSchema = Joi.object({
    photo_url: Joi.string().allow(""),
    name: Joi.string().min(3),
    company_website: Joi.string().allow(""),
    gst_number: Joi.string().allow(""),
    linkedin_url: Joi.string().allow(""),
    facebook_url: Joi.string().allow(""),
    instagram_url: Joi.string().allow(""),
    is_single_branch: Joi.boolean(),
    subdomain: Joi.string().allow(""),

    createBranches: Joi.array()
        .items(
            Joi.object({
                branch_city: Joi.string().required(),
                branch_name: Joi.string().required(),
                branch_address: Joi.string().required(),
                branch_type: Joi.string().valid("headoffice", "branch", "franchise").required(),
                country_code: Joi.string().required(),
                phone_number: Joi.number().required(),
            })
        )
        .default([]),

    updateBranches: Joi.array()
        .items(
            Joi.object({
                _id: Joi.string().required(),
                branch_city: Joi.string(),
                branch_name: Joi.string(),
                branch_address: Joi.string(),
                branch_type: Joi.string().valid("headoffice", "branch", "franchise"),
                country_code: Joi.string(),
                phone_number: Joi.number(),
            }).min(2) // prevents sending only _id with no changes
        )
        .default([]),

    deleteBranchIds: Joi.array()
        .items(Joi.string())
        .default([]),
}).min(1); // ❗ prevents empty body updates

/**
 * =========================
 * Update Consultancy Controller
 * =========================
 */
export const updateConsultancyController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid consultancy ID", 400);
        }

        // 1️⃣ Validate request body
        const { error, value } = consultancyUpdateSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
        }

        const {
            createBranches,
            updateBranches,
            deleteBranchIds,
            ...consultancyData
        } = value;

        // 2️⃣ Ensure consultancy exists
        const consultancy = await Consultancies.findById(id).session(session);
        if (!consultancy) {
            await session.abortTransaction();
            return errorResponse(res, "Consultancy not found", 404);
        }

        // 3️⃣ Update consultancy (only if fields provided)
        let updatedConsultancy = consultancy;
        if (Object.keys(consultancyData).length > 0) {
            updatedConsultancy = await Consultancies.findByIdAndUpdate(
                id,
                { $set: consultancyData },
                { new: true, runValidators: true, session }
            );
        }

        // 4️⃣ Delete branches (ownership enforced)
        if (deleteBranchIds.length > 0) {
            await ConsultancyBranches.deleteMany({
                _id: { $in: deleteBranchIds },
                consultancy_id: id,
            }).session(session);
        }

        // 5️⃣ Update existing branches (ownership enforced)
        for (const branch of updateBranches) {
            const { _id, ...branchData } = branch;

            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error(`Invalid branch ID: ${_id}`);
            }

            const result = await ConsultancyBranches.findOneAndUpdate(
                { _id, consultancy_id: id },
                { $set: branchData },
                { runValidators: true, session }
            );

            if (!result) {
                throw new Error(`Branch not found or unauthorized: ${_id}`);
            }
        }

        // 6️⃣ Create new branches
        if (createBranches.length > 0) {
            const newBranches = createBranches.map(branch => ({
                ...branch,
                consultancy_id: id,
            }));

            await ConsultancyBranches.insertMany(newBranches, { session });
        }

        await session.commitTransaction();
        session.endSession();

        return successResponse(res, "Consultancy updated successfully", {
            consultancy: updatedConsultancy,
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error("❌ Update Consultancy Error:", err.message);
        return errorResponse(res, err.message || "Internal server error", 500);
    }
};
