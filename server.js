// === INIT ===
// grab npm modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// require internal modules
var Bear = require("./app/models/bear"); // mongoose bear model
// init express app
var app = express();
// connect to database
mongoose.connect("mongodb://localhost:27017/bears_db")

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
// The order of how we define the routes is very important!
// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("Something is happening");
  next(); // make sure we go to the next routes and don't stop here
});
// test route (access at GET http://localhost:3000/api)
router.get("/", function(req, res) {
  res.json({message: "Welcome to Bears API!"});
});
// on routes that end in /bears
// i.e. we use router.route to handle multiple routes for the same URI
router.route("/bears")
  // create a bear (accessed at POST http://localhost:3000/api/bears)
  .post(function(req, res) {
    var bear = new Bear(); // new Bear model instance
    bear.name = req.body.name; // set the bears name (comes from the request)
    // save the bear to database
    bear.save(function(err) {
      // check for error
      if (err) res.send(err);
      // everything is OK!
      res.json({message: "Bear is created!"});
    });
  })
  // get all the bears (accessed at GET http://localhost:3000/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) res.send(err);
      // return all found bears
      res.json(bears);
    });
  });

// === REGISTER ROUTES ===
// all of our routes will be prefixed with /api
app.use("/api", router);

// === START THE SERVER ===
app.listen(port);
console.log("Server started at port " + port);
