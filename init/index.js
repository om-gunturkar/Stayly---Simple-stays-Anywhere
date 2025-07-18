const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// IMPORTANT: Replace with your actual MongoDB URL
const MONGO_URL = "mongodb+srv://omgunturkar:om%40gunturkar1092@om.8klyy.mongodb.net/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to db");
    await initDB(); // Call initDB only after successful connection
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

main().catch((err) => {
    console.error("Database connection or initialization error:", err);
});