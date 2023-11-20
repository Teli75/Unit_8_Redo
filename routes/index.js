var express = require("express");
var router = express.Router();
const { Book } = require("../models/index.js");


/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const allBooks = await Book.findAll();
    console.log(allBooks.map(book => book.toJSON()));
    res.json(allBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("server error");
  }
});

module.exports = router;
