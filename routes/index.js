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
      res.status(500).send(error);
    }
  };
}

/* GET home page. */
router.get(
  "/books",
  asyncHandler(async (req, res, next) => {
    console.log("Handling GET request for /books");
    const allBooks = await Book.findAll();
    res.render("layout", { allBooks });
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
router.post('/books/new', asyncHandler(async (req, res) => {
  console.log("request Body: ", req.body);
  const book = await Book.create( req.body );
  res.redirect("/Books");
}));

/*get /books/:id - Shows book detail form */
router.get("/books/:id", async function (req, res, next) {
    const book = await Book.findByPk(req.params.id);
    //console.log(book);
      res.render("update-book", { book: book } );
    });

// /* post /books/:id - Updates book info in the database */
router.post("/books/:id", async function (req, res, next) {
  const book = await Book.findByPk(req.params.id);
  await book.update( req.body );
  res.redirect("/Books");
});

module.exports = router;
