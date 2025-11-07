// testMongoConnection.js

const { MongoClient } = require("mongodb");

// Replace this with your MongoDB connection string
const uri = process.env.MONGO_URI;

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    // Try connecting to the database
    await client.connect();
    console.log("✅ Connected successfully to MongoDB!");

    // Optionally, list available databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  } finally {
    // Always close the connection when done
    await client.close();
  }
}

testConnection();
