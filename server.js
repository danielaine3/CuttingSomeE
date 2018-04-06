//Require NPM packages
var express = require("express");
var mongojs = require("mongojs");
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

//Initialize Express
var app = express();

//SCRAPING TOOLS
//Makes HTTP request for the HTML page
var request = require("request");
var cheerio = require("cheerio");

//Require all models
var db = require("./models");

//Initialize Express
var app = express();

//CONGIGURE MIDDLEWARE
//Use morgan logger for logging requests
app.use(logger("dev"));

//Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({extended:true}));
//parse json
app.use(bodyParser.json());
//Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import controllers and give server access to them
require("./controllers/fetch.js")(app);
require("./controllers/headline.js")(app);
require("./controllers/note.js")(app);

//If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//By defaul mongoose uses callbacks for async queries
//Here we're setting it to use promises (.then syntax) instead
//Conect to the MongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
	// useMongoClient: true
});

//Set port
var PORT = process.env.PORT || 8080;

//Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});