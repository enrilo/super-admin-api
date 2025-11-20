import mongoose from "mongoose";

const accessToken = new mongoose.Schema(
    {
        token: { type: String, required: true },
        super_admin: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin", required: true },
        expires_at: { type: Date, required: true },
        is_revoked: { type: Boolean, default: false },
        is_expired: { type: Boolean, default: false },
        revoked_at: { type: Date },
        expired_at: { type: Date },
        permissions: {
            type: Object,
            default: {}
        },
    },
    { timestamps: true }
);

export default mongoose.model("AccessToken", accessToken);
