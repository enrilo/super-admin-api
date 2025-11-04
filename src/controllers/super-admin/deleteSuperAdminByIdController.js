import mongoose from "mongoose";
import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// 🗑️ DELETE SUPER ADMIN BY ID
export const deleteSuperAdminByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // 🧩 Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid Super Admin ID format", 400);
        }

        // 🔍 Check if Super Admin exists
        const superAdmin = await SuperAdmin.findById(id);
        if (!superAdmin) {
            return errorResponse(res, "Super Admin not found", 404);
        }

        // 🗑️ Delete Super Admin
        await superAdmin.deleteOne();

        // ✅ Respond success
        return successResponse(res, "Super Admin deleted successfully 🚀", {
            success: true,
            deletedSuperAdminId: id,
        });
    } catch (err) {
        console.error("❌ Error deleting Super Admin:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
