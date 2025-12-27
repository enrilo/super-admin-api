import mongoose from "mongoose";

const consultanciesSchema = new mongoose.Schema(
    {
        photo_url: { type: String, default:"https://img.icons8.com/ios7/1200/company.jpg", },
        name: { type: String, required: true },
        company_website: { type: String },
        gst_number: { type: String },
        linkedin_url: { type: String },
        facebook_url: { type: String },
        instagram_url: { type: String },
        is_single_branch: { type: Boolean, default: true },
        office_details: [
            {
                office_city: { type: String },
                office_address: { type: String },
                office_type: { type: String }, // headoffice/branch/franchise
                country_code: { type: String },
                phone_number: { type: Number },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Consultancies", consultanciesSchema);