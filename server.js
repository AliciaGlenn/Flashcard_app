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

app.get("/flashcards/seed", (req, res) => {
  // array of starter flashcards
  const startFlashcards = [
    { term: "bonjour", definition: "hi" },
    { term: "manger", definition: "eat" },
    { term: "enfants", def: "children" },
  ];

  // Delete all fruits
  Flashcard.remove({}, (err, data) => {
    // Seed Starter Fflashcards
    Flashcard.create(startFlashcards, (err, data) => {
      // send created flashcards as response to confirm creation
      res.json(data);
    });
  });
});

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

//INDUCES
// index route - GET LIST OF FLASHCARDS
app.get("/flashcards", (req, res) => {
  Flashcard.find({}, (err, flashcards) => {
    res.render("index.ejs", { flashcards });
  });
});

// new route - GET - GET THE NEW FORM

app.get("/flashcards/new", (req, res) => {
  res.render("new.ejs");
});

// Destroy route - DELETE - DELETES ONE FLASHCARD

app.delete("/flashcards/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the flashcards
  Flashcard.findByIdAndRemove(id, (err, flashcard) => {
    // redirect user back to index page
    res.redirect("/flashcards");
  });
});

// Update Route - PUT - UPDATES ONE FLASHCARD

app.put("/flashcards/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the flashcards
  Flashcard.findByIdAndUpdate(id, req.body, { new: true }, (err, flashcard) => {
    // redirect user back to main page when flashcard
    res.redirect("/flashcards");
  });
});

// Create route - POST - Creates a flashcard
app.post("/flashcards", (req, res) => {
  // create the new flashcard
  Flashcard.create(req.body, (err, flashcard) => {
    // redirect the user back to the main flashcard page after flashcard created
    res.redirect("/flashcards");
  });
});

// Edit route - GET - GETS THE EDIT FORM

app.get("/flashcards/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the flashcard from the database
  Flashcard.findById(id, (err, flashcard) => {
    // render template and send it fruit
    res.render("edit.ejs", { flashcard });
  });
});

// Show route -  GET - GETS ONE FLASHCARD
app.get("/flashcards/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular flashcard from the database
  Flashcard.findById(id, (err, flashcard) => {
    // render the template with the data from the database
    res.render("show.ejs", { flashcard });
  });
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
