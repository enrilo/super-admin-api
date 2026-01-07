import mongoose from "mongoose";

const consultancyBranchesSchema = new mongoose.Schema(
    {
        consultancy_id: { type: mongoose.Schema.Types.ObjectId, ref: "Consultancies", required: true },
        branch_city: { type: String, required: true },
        branch_name: { type: String, required: true },
        branch_address: { type: String, required: true },
        branch_type: { type: String, required: true }, // headoffice/branch/franchise
        country_code: { type: String, required: true },
        phone_number: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("ConsultancyBranches", consultancyBranchesSchema);