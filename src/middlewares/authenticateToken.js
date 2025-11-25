import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AccessToken from "../models/AccessToken.js";

dotenv.config();

async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is required" });
    }

    try {
        // Decode JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find token in DB
        const accessToken = await AccessToken.findOne({
            token,
            is_revoked: false,
            is_expired: false,
        });

        if (!accessToken) {
            return res.status(403).json({ message: "Token is revoked or expired" });
        }

        // Attach decoded user + full token data
        req.user = decoded;
        req.token = accessToken;  // <-- IMPORTANT

        next();
    } catch (err) {
        console.error("Auth Error:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

export default authenticateToken;
