///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Flashcard = require("./flashcards");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// Make sure code is not run till connected
mongoose.connection.on("open", () => {
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
      // log the create fruits to confirm
      console.log("--------FRUITS CREATED----------");
      console.log(data);
      console.log("--------FRUITS CREATED----------");

      // close the DB connection
      mongoose.connection.close();
    });
  });
});
