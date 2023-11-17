const { MongoClient } = require("mongodb");
const env = require("dotenv");

env.config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database");
    return client.db();
  } catch (err) {
    console.error("Error connecting to the database: ", err);
    throw err;
  }
}

module.exports = connectDB;
