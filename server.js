//Require NPM packages
var express = require("express");
var bodyParser= require("body-parser");
var mongoose = require("mongoose");


//Scraping tools
var cheerio = require("cheerio");

//Require all models
var db = require(".models");

var PORT = 3000;

//Initialize Express
var app = express();

//CONGIGURE MIDDLEWARE
//Use morgan logger for logging requests
app.use(logger("dev"));
//Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({extended:true}));
//Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Set Handlebars
var exphbs = require("express.handlebars");
app.enging("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes and give server acess to them
var routes = require("./routes");
app.use(routes);

//If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//By defaul mongoose uses callbacks for async queries
//Here we're setting it to use promises (.then syntax) instead
//Conect to the MongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
	useMongoClient: true
});