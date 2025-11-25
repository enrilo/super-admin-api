import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
    {
        resource: { type: String, required: true },
        actions: {
            type: Map,
            of: Boolean,
            default: {}
        }
    },
    { _id: false }
);

const accessToken = new mongoose.Schema(
    {
        token: { type: String, required: true },
        super_admin: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin", required: true },
        expires_at: { type: Date, required: true },
        is_revoked: { type: Boolean, default: false },
        is_expired: { type: Boolean, default: false },
        revoked_at: { type: Date },
        expired_at: { type: Date },

        // 🚀 Dynamic permissions here
        allow_write: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("AccessToken", accessToken);
