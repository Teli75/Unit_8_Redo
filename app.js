var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { sequelize } = require("./models/index");

var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();


app.use((req, res, next) => {
  res.status(404);
  console.log('nonsense');
  next(createError(404));
});

/*Error Handling */
app.use((err, req, res, next) => {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  if (err.status === 404) {
    res.render("page-not-found");
  } else {
    err.status = err.status || 500;
    res.render("error", { err });
  }
});
module.exports = app;

