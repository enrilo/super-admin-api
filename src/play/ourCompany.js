import connectDB from "../config/db.js";
import OurCompany from "../models/OurCompany.js";

(async function seedOurCompany() {
  try {
    console.log("🚀 Starting Our Company seeding...");
    
    // Connect to MongoDB
    await connectDB();

    // Sample Our Company data
    const ourCompanyData = {
      logo_url: "https://example.com/uploads/company_logo.jpg",
      name: "Enrilo",
      website: "https://enrilo.com",
      gst_number: "1234567890",
      linkedin: "https://linkedin.com/enrilo",
      twitter: "https://twitter.com/enrilo",
      facebook: "https://facebook.com/enrilo",
      instagram: "https://instagram.com/enrilo",
    };

    // Ensure there’s no duplicate Our Company
    const existingCompany = await OurCompany.findOne({
      name: ourCompanyData.name,
    });

    if (existingCompany) {
      console.log("⚠️ Our Company already exists. Skipping creation.");
      process.exit(0);
    }

    // Create and save Our Company
    const ourCompany = new OurCompany(ourCompanyData);
    await ourCompany.save();

    console.log("🎉 Our Company saved successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Our Company:", error);
    process.exit(1);
  }
})();
