import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
    {
        // Basic Info
        photo_url: { type: String, default:"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", },
        full_name: { type: String, required: true },
        country_code: { type: String, required: true },
        phone: { type: Number, required: true },
        company_email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        reset_password_token: { type: String },
        email: { type: String },
        position: { type: String, required: true }, // e.g., "Super Admin", "CEO", etc.

        // Address Info
        street_1: { type: String },
        street_2: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zipcode: { type: String },

        // Emergency Contact
        emergency_contact: {
            name: { type: String, required: true },
            relation: { type: String, required: true },
            country_code: { type: String, required: true },
            phone: { type: Number, required: true },
        },

        // Documents (can store file URLs or metadata)
        documents: [
            {
                _id: false,
                name: { type: String }, // e.g., "Passport", "ID Card"
                url: { type: String },  // file or document URL
                number: { type: String },  // file or document URL
                uploaded_at: { type: Date, default: Date.now },
            },
        ],

        bank_details: {
            account_number: { type: String },
            account_holder_name: { type: String },
            bank_name: { type: String },
            branch_name: { type: String },
            branch_address: { type: String },
            ifsc_code: { type: String },
        },

        role: { type: String, default: "user" },

        // Access Control
        is_active: { type: Boolean, default: true },
        last_login: { type: Date },

        // Metadata
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notes: { type: String },

        allow_write_access: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("SuperAdmin", superAdminSchema);
