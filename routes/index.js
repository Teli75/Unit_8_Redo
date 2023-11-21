var express = require("express");
var router = express.Router();
const { Book } = require("../models/index.js");

//Instead of using the findAll method over and over again can I just set all the books to a variable and use the variable in the individual routes?

/* GET home page. */
router.get("/", async function (req, res, next) {
  console.log("Handling GET request for /");
  try {
    const allBooks = await Book.findAll();
    console.log(allBooks.map((book) => book.toJSON()));
    res.json(allBooks);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).send("server error");
  }
});

/* Books Page */
//Should this route replace "/"??
router.get("/books", async function (req, res, next) {
  console.log("handling GET req for /books");
  try {
    const allBooks = await Book.findAll();
    console.log(allBooks.map((book) => book.toJSON()));
    res.render("layout", { allBooks });
  } catch (error) {
    console.error("error getting books:", error);
    res.status(500).send("server error");
  }
});

/* Shows the create new book forme */
router.get("/books/new", async function (req, res, next) {
  console.log("handling GET req for /books/new");
  try {
    const allBooks = await Book.findAll();
    console.log(allBooks.map((book) => book.toJSON()));
    res.render("new-book", { allBooks });
  } catch (error) {
    console.error("error fetching books:", error);
    res.status(500).send("server error");
  }
});

/* post /books/new - Posts a new book to the database */


// /*get /books/:id - Shows book detail form */
// router.get("/books/:id", async function (req, res, next) {
//   console.log("handling GET req for /books/:id");


//     const allBooks = await Book.findAll();
//     console.log(allBooks.map((book) => book.toJSON()));

//     const book = await Book.findByPk(req.params.id);
    
//       res.render("update-book", { Book });
   
//     });



// /* post /books/:id - Updates book info in the database */


module.exports = router;
