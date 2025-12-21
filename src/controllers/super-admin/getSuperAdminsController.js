// import SuperAdmin from "../../models/SuperAdmin.js";
// import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// // 🧩 GET SUPER ADMINS with search and filters
// export const getSuperAdminsController = async (req, res) => {
//     try {
//         const { search, country, state, city, page = 1, limit = 10 } = req.query;

//         // 🧠 Build dynamic filter
//         const filter = {};

//         if (country) filter.country = country;
//         if (state) filter.state = state;
//         if (city) filter.city = city;

//         if (search) {
//             filter.$or = [
//                 { full_name: { $regex: search, $options: "i" } },
//                 { role: { $regex: search, $options: "i" } },
//                 { company_email: { $regex: search, $options: "i" } },
//                 { phone: { $regex: search, $options: "i" } },
//                 { position: { $regex: search, $options: "i" } },
//             ];
//         }

//         const skip = (page - 1) * limit;

//         console.log('filter');
//         console.log(filter);
        
//         // 🧩 Fetch data
//         const superAdmins = await SuperAdmin.find(filter)
//             .select("-password") // hide password if exists
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(Number(limit));

//         const totalSuperAdmins = await SuperAdmin.countDocuments(filter);

//         return successResponse(res, "Super admins fetched successfully 🚀", {
//             message: "Super admins fetched successfully",
//             success: true,
//             total: totalSuperAdmins,
//             currentPage: Number(page),
//             totalPages: Math.ceil(totalSuperAdmins / limit),
//             superAdmins,
//         });
//     } catch (err) {
//         console.error("❌ Error fetching super admins:", err);
//         return errorResponse(res, "Internal server error", 500);
//     }
// };
import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// 🧩 GET SUPER ADMINS with search and filters
export const getSuperAdminsController = async (req, res) => {
    try {
        const { search, full_name, role, company_email, phone, position, page = 1, limit = 10 } = req.query;

        // 🧠 Build dynamic filter
        const filter = {};

        // Field-specific filters
        if (full_name) filter.full_name = { $regex: full_name, $options: "i" };
        if (role) filter.role = role;
        if (company_email) filter.company_email = { $regex: company_email, $options: "i" };
        if (phone) filter.phone = { $regex: phone, $options: "i" };
        if (position) filter.position = { $regex: position, $options: "i" };

        // General search across multiple fields
        if (search) {
            filter.$or = [
                { full_name: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } },
                { company_email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { position: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;

        // 🧩 Fetch data
        const superAdmins = await SuperAdmin.find(filter)
            .select("-password")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalSuperAdmins = await SuperAdmin.countDocuments(filter);

        return successResponse(res, "Super admins fetched successfully 🚀", {
            message: "Super admins fetched successfully",
            success: true,
            total: totalSuperAdmins,
            currentPage: Number(page),
            totalPages: Math.ceil(totalSuperAdmins / limit),
            superAdmins,
        });
    } catch (err) {
        console.error("❌ Error fetching super admins:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
