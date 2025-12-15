import mongoose from "mongoose";

const ourCompanySchema = new mongoose.Schema(
    {
        logo_url: { type: String, default:"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", },
        name: { type: String, required: true },
        address: { type: String, required: true },
        website: { type: String, required: true },
        gst_number: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        facebook: { type: String },
        instagram: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("OurCompany", ourCompanySchema);
