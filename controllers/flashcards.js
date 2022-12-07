////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Flashcard = require("../models/flashcards");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

router.get("/seed", (req, res) => {
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

//INDUCES
// index route - GET LIST OF FLASHCARDS
router.get("/", (req, res) => {
  Flashcard.find({}, (err, flashcards) => {
    res.render("index.ejs", { flashcards });
  });
});

// new route - GET - GET THE NEW FORM

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// Destroy route - DELETE - DELETES ONE FLASHCARD

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the flashcards
  Flashcard.findByIdAndRemove(id, (err, flashcard) => {
    // redirect user back to index page
    res.redirect("/flashcards");
  });
});

// Update Route - PUT - UPDATES ONE FLASHCARD

router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the flashcards
  Flashcard.findByIdAndUpdate(id, req.body, { new: true }, (err, flashcard) => {
    // redirect user back to main page when flashcard
    res.redirect("/flashcards");
  });
});

// Create route - POST - Creates a flashcard
router.post("/", (req, res) => {
  // create the new flashcard
  Flashcard.create(req.body, (err, flashcard) => {
    // redirect the user back to the main flashcard page after flashcard created
    res.redirect("/flashcards");
  });
});

// Edit route - GET - GETS THE EDIT FORM

router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the flashcard from the database
  Flashcard.findById(id, (err, flashcard) => {
    // render template and send it fruit
    res.render("edit.ejs", { flashcard });
  });
});

// Show route -  GET - GETS ONE FLASHCARD
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular flashcard from the database
  Flashcard.findById(id, (err, flashcard) => {
    // render the template with the data from the database
    res.render("show.ejs", { flashcard });
  });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
