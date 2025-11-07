import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import { generateResetToken } from "../../utils/generateResetToken.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const resetPasswordSuperAdmin = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // 0️⃣ Validate input
        if (!token || !newPassword) {
            return errorResponse(res, "Token and new password are required", 400);
        }

        // 1️⃣ Check if token is valid and not expired
        const admin = await SuperAdmin.findOne({
            reset_password_token: token,
            reset_password_expires: { $gt: Date.now() },
        });
        if (!admin) {
            return errorResponse(res, "Invalid or expired token", 400);
        }

        // 2️⃣ Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3️⃣ Update SuperAdmin with new password and clear token
        admin.password = hashedPassword;
        admin.reset_password_token = undefined;
        admin.reset_password_expires = undefined;
        await admin.save({ validateBeforeSave: false });

        // 4️⃣ Return success response
        return successResponse(res, "Password reset successful 🚀", {
            success: true,
        });
    } catch (err) {
        console.error("❌ Error resetting password:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
