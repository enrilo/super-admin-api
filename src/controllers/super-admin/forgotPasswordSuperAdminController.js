import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import { generateResetToken } from "../../utils/generateResetToken.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const forgotPasswordSuperAdminController = async (req, res) => {
    try {
        const { company_email } = req.body;

        // 0️⃣ Validate input
        if (!company_email) {
            return errorResponse(res, "Company email is required", 400);
        }

        // 1️⃣ Email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(company_email)) {
            return errorResponse(res, "Invalid email format", 400);
        }

        // 2️⃣ Check if SuperAdmin exists
        const admin = await SuperAdmin.findOne({ company_email });
        if (!admin) {
            return errorResponse(res, "SuperAdmin not found", 404);
        }
        console.info('admin');
        console.info(admin);

        // 3️⃣ Generate reset password token
        const resetToken = generateResetToken(); // Implement this function
        console.info(`resetToken: ${resetToken}`);

        // 4️⃣ Update SuperAdmin with reset token
        admin.reset_password_token = resetToken;
        await admin.save({ validateBeforeSave: false });

        // 5️⃣ Send reset password email (implement this function)
        await sendEmail({
            to: admin.company_email,
            subject: "Enrilo Password Reset Request",
            template: "resetPassword",
            context: {
                name: admin.full_name,
                resetLink: `https://yourapp.com/reset-password?token=${resetToken}`,
            },
        });


        // 6️⃣ Return success response
        return successResponse(res, "Password reset email sent successfully 🚀", {
            success: true,
        });
    } catch (err) {
        console.error("❌ Error sending password reset email:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
