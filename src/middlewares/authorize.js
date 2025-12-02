export default function authorize() {
    return (req, res, next) => {
        const token = req.token;

        if (!token) {
            return res.status(403).json({ message: "Not authenticated" });
        }

        // Write protection: false => only GET allowed
        if (!token.allow_write_access && req.method !== "GET") {
            return res.status(403).json({
                message: "Write operations are not allowed for this token"
            });
        }

        next();
    };
}
