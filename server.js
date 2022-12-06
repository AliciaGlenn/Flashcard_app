/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
const MONGO = process.env.Mongo;

// Create express app
const app = express();

// establish mongo connection
mongoose.connect(process.env.MONGO);

// mongoose connection events
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make flashcards schema
const flashcardsSchema = new Schema(
  {
    term: { type: String, required: true },
    definition: String,
  },
  { timestamps: true }
);

// make flashcards model
const Flashcard = model("Flashcard", flashcardsSchema);

// Export the Flashcards model
module.exports = Flashcard;

// register middleware
app.use(morgan("dev"));
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
