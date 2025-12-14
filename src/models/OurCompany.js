import mongoose from "mongoose";

const ourCompanySchema = new mongoose.Schema(
    {
        logo_url: { type: String, default:"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", },
        name: { type: String, required: true },
        website: { type: String, required: true },
        gst_number: { type: String, required: true },
        linkedin: { type: String, required: true },
        twitter: { type: String, required: true },
        facebook: { type: String, required: true },
        instagram: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("OurCompany", ourCompanySchema);
