//Require NPM packages
var express = require("express");
var bodyParser= require("body-parser");
var mongoose = require("mongoose");

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
// app.use(logger("dev"));
//Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({extended:true}));
//Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give server access to them
var routes =require("./routes/index.js");
app.use(routes);

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
var PORT = 3000;

//Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
