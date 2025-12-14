import connectDB from "../config/db.js";
import SuperAdmin from "../models/SuperAdmin.js";
import bcrypt from "bcrypt";

(async function seedSuperAdmin() {
  try {
    console.log("🚀 Starting Super Admin seeding...");

    // Connect to MongoDB
    await connectDB();

    // Password setup
    const plainPassword = "Tommy@2398";
    const hashedPassword = await hashPassword(plainPassword);

    // Sample Super Admin data
    const superAdminData = {
      photo_url: "https://example.com/uploads/superadmin_photo.jpg",
      full_name: "Tommy",
      country_code: "+91",
      phone: 8320336901,
      company_email: "tommy@yopmail.com",
      email: "tommy@yopmail.com",
      position: "Global Super Admin",

      street_1: "221B Baker Street",
      street_2: "Near City Center",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipcode: "400001",

      emergency_contact: {
        name: "Admin Account",
        relation: "Brother",
        country_code: "+91",
        phone: 8320336901,
      },

      documents: [
        {
          name: "Passport",
          url: "https://example.com/uploads/passport_ayaan.pdf",
          number: "P1234567",
        },
        {
          name: "ID Card",
          url: "https://example.com/uploads/id_ayaan.pdf",
          number: "ID987654",
        },
      ],

      is_active: true,
      notes: "Primary super admin responsible for global access.",
      password: hashedPassword, // optional if your schema stores it,

      bank_details: [
        {
          account_number: "1234567890",
          account_holder_name: "Thomas Shelby",
          bank_name: "ICICI Bank",
          branch_address: "Vadodara",
          ifsc_code: "HDFC0000001",
        },
      ],

      role: "super_admin",
    };

    // Ensure there’s no duplicate Super Admin
    const existingAdmin = await SuperAdmin.findOne({
      company_email: superAdminData.company_email,
    });

    if (existingAdmin) {
      console.log("⚠️ Super Admin already exists. Skipping creation.");
      process.exit(0);
    }

    // Create and save Super Admin
    const superAdmin = new SuperAdmin(superAdminData);
    await superAdmin.save();

    console.log("🎉 Super Admin saved successfully!");
    console.log("✅ Login credentials:");
    console.log(`   Email: ${superAdminData.company_email}`);
    console.log(`   Password: ${plainPassword}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Super Admin:", error);
    process.exit(1);
  }
})();

// Utility: Hash Password
const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};
