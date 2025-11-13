import mongoose from "mongoose";
import bcrypt from "bcrypt";
import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// 🔐 CHANGE SUPER ADMIN PASSWORD
export const changePasswordSuperAdminController = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Super Admin ID format", 400);
        }

        // 🧍‍♂️ Find Super Admin
        const superAdmin = await SuperAdmin.findById(id);
        if (!superAdmin) {
            return errorResponse(res, "Super Admin not found", 404);
        }

        // 🔑 Compare old password
        const isMatch = await bcrypt.compare(oldPassword, superAdmin.password);
        if (!isMatch) {
            return errorResponse(res, "Old password is incorrect", 401);
        }

        // 🧂 Hash new password securely
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // 💾 Update and save
        superAdmin.password = hashedPassword;
        await superAdmin.save();

        // ✅ Send success response
        return successResponse(res, "Password changed successfully 🔐", {
            success: true,
        });
    } catch (err) {
        console.error("❌ Error changing password:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
