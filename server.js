/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const Flashcard = require("./models/flashcards");
const FlashcardRouter = require("./controllers/flashcards");
const UserRouter = require("./controllers/user");

// Create express app
const app = express();

// register middleware
app.use(morgan("dev"));
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/flashcards", FlashcardRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
