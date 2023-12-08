var express = require("express");
var router = express.Router();
const Book = require("../models").Book;

/* Handler function to wrap each route */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next();
    }
  };
}

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.redirect("/books");
  })
);

/* GET Books Page. */
router.get(
  "/books",
  asyncHandler(async (req, res, next) => {
    const allBooks = await Book.findAll();
    res.render("index", { allBooks });
  })
);

/* GET /books/new - Shows the create new book form */
router.get(
  "/books/new",
  asyncHandler(async (req, res) => {
    res.render("new-book", { book: {} });
  })
);

/* POST create book */
router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        console.log(error);
        //let newBook = await Book.build(req.body);
        res.render("new-book", { newBook, errors: error.errors });
      } else {
        throw error;
      }
    }
  })
);

/* GET /books/:id - Shows book detail form */
router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book: book });
    } else {
      next();
    }
  })
);

/* POST /books/:id - Updates book info in the database */
router.post(
  "/books/:id",
  asyncHandler(async (req, res) => {
    
    try {
      console.log('entered try block');
    let book;
      book = await Book.findByPk(req.params.id);
      

      if (book) {
        await book.update(req.body);
        res.redirect("/books");
      } else {
        console.log("entered else block");
        res.sendStatus(404);
        
        throw error;
      }
    } catch (error) {
      console.log("did it work?");
      if (error.name === "SequelizeValidationError") {
        console.log(error);
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("update-book", { book, errors: error.errors });
      } else {
        throw error;
      }
    }
  })
);

/* GET -  Deletes a book */
router.post(
  "/books/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy(req.body);
      res.redirect("/books");
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
