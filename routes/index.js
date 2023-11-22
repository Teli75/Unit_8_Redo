var express = require("express");
var router = express.Router();
//This seemed to work without .Book at the end
const { Book } = require("../models/index.js");

/* Handler function to wrap each route */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log("server error");
      //res.status(500).send(error);
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
    console.log("Handling GET request for /books");
    const allBooks = await Book.findAll();
    res.render("index", { allBooks });
  })
);

/* GET /books/new - Shows the create new book form */
router.get(
  "/books/new",
  asyncHandler(async (req, res) => {
    console.log("Handling GET request for /books/new");
    res.render("new-book", { book: {} } );
  })
);

// /* POST /books/new - Posts a new book to the database */
// router.post('/books/new', asyncHandler(async (req, res) => {
//   console.log("request Body: ", req.body);
//   const book = await Book.create( req.body );
//   res.redirect("/Books");
// }));

/* POST create book */
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('/books/new', { book, errors: error.errors })
    } else {
      throw error;
    }  
  }
}));

/* GET /books/:id - Shows book detail form */
router.get("/books/:id", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    //console.log(book);
      res.render("update-book", { book: book } );
    }));

/* POST /books/:id - Updates book info in the database */
router.post("/books/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update( req.body );
  res.redirect("/Books");
}));

/* GET -  Deletes a book */
router.post("/books/:id/delete", asyncHandler(async (req, res) => {
  console.log("Entering post route");
  const book = await Book.findByPk(req.params.id);
  await book.destroy( req.body );
  res.redirect("/Books");
}));

module.exports = router;
