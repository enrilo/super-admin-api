import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

/* ---------------------------------------------------
🚀 SuperAdmin Login Controller
--------------------------------------------------- */
export const superAdminLoginController = async (req, res) => {
    try {
        const { company_email, password } = req.body;

        // 0️⃣ Validate input
        if (!company_email || !password) {
            return errorResponse(res, "Company email and password are required", 400);
        }

        // 1️⃣ Email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(company_email)) {
            return errorResponse(res, "Invalid email format", 400);
        }

        // 2️⃣ Password length validation
        if (password.length < 6) {
            return errorResponse(res, "Password must be at least 6 characters long", 400);
        }

        // 3️⃣ Check if SuperAdmin exists
        const admin = await SuperAdmin.findOne({ company_email }).select("+password");
        if (!admin) {
            return errorResponse(res, "Invalid email or password", 401);
        }

        // ⚠️ Ensure password exists (in case it's not set)
        if (!admin.password) {
            return errorResponse(res, "This SuperAdmin does not have login access", 403);
        }

        // 4️⃣ Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return errorResponse(res, "Invalid email or password", 401);
        }

        // 5️⃣ Generate JWT
        const payload = {
            id: admin._id,
            company_email: admin.company_email,
            role: "super_admin",
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d", // adjust as needed
        });

        // 6️⃣ Update last login timestamp
        admin.last_login = new Date();
        await admin.save();

        // 7️⃣ Return success response
        return successResponse(res, "SuperAdmin login successful 🚀", {
            accessToken,
            superAdmin: {
                id: admin._id,
                full_name: admin.full_name,
                company_email: admin.company_email,
                position: admin.position,
                role: "super_admin",
            },
        });
    } catch (error) {
        console.error("❌ SuperAdmin Login Error:", error.message);
        return errorResponse(res, "Server Error", 500);
    }
};
