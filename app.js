var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//const { sequelize } = require("./models/index");

var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
//Provide access to the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use("/users", usersRouter);

(async () => {
  try {
    //await sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

app.use((req, res, next) => {
  console.log("I'm sorry, but this page is not found");
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  if (err.status === 404) {
    res.status(404);
    err.status = 404;
    err.message = "I'm sorry, but this page isn't found";
    res.render("page-not-found", { err });
  } else {
    err.status = err.status || 500;
    console.log(err.status);
    err.message = err.message || "Whoops!";

    res.status(err.status);
    res.render("error", { err });
  }
});
module.exports = app;

