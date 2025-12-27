import connectDB from "../config/db.js";
import Consultancies from "../models/Consultancies.js";

(async function seedConsultancy() {
  try {
    console.log("🚀 Starting Consultancy seeding...");
    
    // Connect to MongoDB
    await connectDB();

    // Sample Consultancy data
    const consultancyData = {
      photo_url: "https://example.com/uploads/consultancy_logo.jpg",
      name: "Enrilo",
      gst_number: "1234567890",
      linkedin_url: "https://linkedin.com/enrilo",
      facebook_url: "https://facebook.com/enrilo",
      instagram_url: "https://instagram.com/enrilo",
      is_single_branch: true,
      office_details: [
        {
          office_name: "Head Office",
          office_address: "221B Baker Street, Mumbai",
          office_type: "headoffice",
          country_code: "+91",
          phone_number: 1234567890,
        },
      ],
    };

    // Ensure there’s no duplicate Consultancy
    const existingConsultancy = await Consultancies.findOne({
      name: consultancyData.name,
    });

    if (existingConsultancy) {
      console.log("⚠️ Consultancy already exists. Skipping creation.");
      process.exit(0);
    }

    // Create and save Consultancy
    const consultancy = new Consultancies(consultancyData);
    await consultancy.save();

    console.log("🎉 Consultancy saved successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Consultancy:", error);
    process.exit(1);
  }
})();
