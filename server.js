//Require NPM packages
var express = require("express");
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

// Import routes and give server access to them
// var routes =require("./routes/index.js");
// app.use(routes);

// var scripts = require("./scripts/scrape.js");
// app.use(scripts);

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

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/headlines", function(req,res) {
	//First, we grab the body of the html with request
	request("http://www.eonline.com/news", function(error, response, html) {
		//Then, we load that into cheerio and save it to $ for a shorthand select
		var $ = cheerio.load(html);
		
		//Now we grab every story-card tag, and do the following: 
		$(".clear").each(function(i, element) {
			//Save an empty result object
			var result = {};

			//Add the text, href and img of every link, and save them as properties of the result object
			result.title = $(this).children(".title").children("h3").children(".articleTitle").text();
			result.pic = $(this).children(".thumbnail").children("img").attr("src");
			result.link = $(this).children(".thumbnail").attr("href");
			
			//Create a new Headline using the 'result' object built from scraping
			db.Headline.create(result)
			.then(function(dbHeadline) {
				//view the added result in the console
				console.log(dbHeadline);
			})
			.catch(function(err) {
				//If error occurred, send to client
				// return res.json(err);
				console.log(err.message);
			});
		});

		//If scrape successful, save a Headline, send message to the client
		// res.render("home");
	});

	//Route for getting all Headlines from the db
	db.Headline.find({})
	.then(function(dbHeadline) {
		console.log(dbHeadline)
		// var hbObject = {Headline: dbHeadline};
		// res.render ("home", hbObject);
		res.json(dbHeadline);
	})
	.catch(function(err) {
		//If error occurred, send to client
		res.json(err);
	});	

});

//Route for grabbing saved headlines from the DB
app.get("/saved", function(req, res) {
	// db.Headline.find({})
	// .then(function(dbHeadline) {
	// 	res.json(dbHeadline);
	// })
	// .catch(function(err) {
	// 	res.json(err);
	// });
	res.render("saved");
});

//Route for grabbing a specific headline by id, pop ulate it with a note
app.get("/headlines/:id", function(req, res) {
	db.Headline.findOne({_id:req.params.id})
	.populate("note")
	.then(function(dbHeadline) {
		res.json(dbArticle);
	})
	.catch(function(err) {
		res.json(err);
	});
});	

