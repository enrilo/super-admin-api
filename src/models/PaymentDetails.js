import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema(
    {
        consultancy_id: { type: mongoose.Schema.Types.ObjectId, ref: "Consultancies", required: true },
        consultancy_name: { type: String, required: true },
        rate: { type: Number, required: true },
        duration_in_months: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        is_discount_available: { type: Boolean, default: false },
        discount_amount: { type: Number, default: 0 },
        net_total: { type: Number, required: true },
        gst_amount: { type: Number, required: true },
        grand_total: { type: Number, required: true },
        payment_status: { type: String, enum: ["pending", "partial", "full"], default: "pending" },
        payment_received: { type: Number, default: 0 },
        pending_payment: { type: Number, default: 0 },
        from_date: { type: Date, required: true },
        to_date: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("PaymentDetails", paymentDetailsSchema);