import SuperAdmin from "../models/SuperAdmin.js";

export default function authorize() {
    return async (req, res, next) => {
        const token = req.token;

        if (!token) {
            return res.status(403).json({ message: "Not authenticated" });
        }

        // Fetch super admin data from DB
        const superAdmin = await SuperAdmin.findById(token.super_admin_id);
        if (!superAdmin) {
            return res.status(403).json({ message: "Super admin not found" });
        }


        // Write protection: false => only GET allowed
        if (superAdmin.allow_write_access === false && req.method !== "GET") {
            return res.status(403).json({
                message: "Write operations are not allowed for this token"
            });
        }

        next();
    };
}
