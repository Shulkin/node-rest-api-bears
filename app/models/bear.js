var mongoose = require("mongoose"); // grab mongoose first

// define our bear schema
var BearSchema = new mongoose.Schema({
  // only name is available
  name: String
});

// open bear schema for other modules
module.exports = mongoose.model("Bear", BearSchema);
