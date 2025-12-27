import connectDB from "../config/db.js";
import PaymentDetails from "../models/PaymentDetails.js";

(async function seedPaymentDetails() {
  try {
    console.log("🚀 Starting Payment Details seeding...");
    
    // Connect to MongoDB
    await connectDB();

    // Sample Payment Details data
    const paymentDetailsData = {
      consultancy_id: "64e066666666666666666666",
      consultancy_name: "Enrilo",
      rate: 10000,
      duration_in_months: 12,
      subtotal: 120000,
      is_discount_available: false,
      discount_amount: 0,
      net_total: 120000,
      gst_amount: 12000,
      grand_total: 132000,
      payment_status: "pending",
      payment_received: 0,
      pending_payment: 132000,
      from_date: "2021-01-01",
      to_date: "2021-12-31",
    };

    // Ensure there’s no duplicate Payment Details
    const existingPaymentDetails = await PaymentDetails.findOne({
      consultancy_id: paymentDetailsData.consultancy_id,
    });

    if (existingPaymentDetails) {
      console.log("⚠️ Payment Details already exists. Skipping creation.");
      process.exit(0);
    }

    // Create and save Payment Details
    const paymentDetails = new PaymentDetails(paymentDetailsData);
    await paymentDetails.save();

    console.log("🎉 Payment Details saved successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Payment Details:", error);
    process.exit(1);
  }
})();
