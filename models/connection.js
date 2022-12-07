/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const { config } = require("dotenv");
const mongoose = require("mongoose");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
const MONGO = process.env.Mongo;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// establish mongo connection
mongoose.connect(process.env.MONGO, CONFIG);

// mongoose connection events
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

// Export the Flashcards model
module.exports = mongoose;
