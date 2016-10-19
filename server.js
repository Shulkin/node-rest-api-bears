// === INIT ===
// grab modules
var express = require("express");
var bodyParser = require("body-parser");
// init express app
var app = express();

// === CONFIG ===
// configure app to use bodyParser()
// this will let us to get the data from a POST
// The "extended" syntax allows for rich objects and arrays to be encoded into
// the URL-encoded format, allowing for a JSON-like experience with URL-encoded
app.use(bodyParser.urlencoded({extended: true}));
// allows to parse JSON
app.use(bodyParser.json());

// === PORT ===
// set port
var port = process.env.PORT || 3000;

// === API ROUTES ===
// set routes for API
var router = express.Router(); // get the instance of Router
// test route (access at GET http://localhost:3000/api)
router.get("/", function(req, res) {
  res.json({message: "Welcome to Bears API!"});
});
// other router will go here
// ---

// === REGISTER ROUTES ===
// all of our routes will be prefixed with /api
app.use("/api", router);

// === START THE SERVER ===
app.listen(port);
console.log("Server started at port " + port);
