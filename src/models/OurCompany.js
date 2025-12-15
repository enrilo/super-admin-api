import mongoose from "mongoose";

const ourCompanySchema = new mongoose.Schema(
    {
        logo_url: { type: String, default:"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", },
        name: { type: String, required: true },
        address: { type: String, required: true },
        website: { type: String, required: true },
        gst_number: { type: String, required: false },
        linkedin: { type: String, required: false },
        twitter: { type: String, required: false },
        facebook: { type: String, required: false },
        instagram: { type: String, required: false },
    },
    { timestamps: true }
);

export default mongoose.model("OurCompany", ourCompanySchema);
