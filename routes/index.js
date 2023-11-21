var express = require("express");
var router = express.Router();
const { Book } = require("../models/index.js");


/* GET home page. */
router.get("/", async function (req, res, next) {
  console.log("Handling GET request for /");
  try {
    const allBooks = await Book.findAll();
    console.log(allBooks.map(book => book.toJSON()));
    res.json(allBooks);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).send("server error");
  }
});

router.get("/books", async function (req, res, next) {
  console.log("handling GET req for /books");
  try {
    const allBooks = await Book.findAll();
    console.log(allBooks.map((book) => book.toJSON()));
    res.render('layout', { allBooks });
  } catch (error) {
    console.error("error getting books:", error);
    res.status(500).send("server error");
  }
});

router.get("/books/new", async function (req, res, next) {
  console.log("handling GET req for /books/new");
  try {
    const allBooks = await Book.findAll();
    console.log(allBooks.map((book) => book.toJSON()));
    res.render('new-book', { allBooks });
  } catch (error) {
    console.error("error fetching books:", error);
    res.status(500).send("server error");
  }
});
module.exports = router;
