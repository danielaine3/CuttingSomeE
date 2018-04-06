//Require models
const db = require("../models");

const request = require("request");
const cheerio = require("cheerio");

//Routes
module.exports = function(app) {
	app.get("/", function(req,res) {
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
					return res.json(err);
					// console.log(err.message);
				});
			});

			//If scrape successful, save a Headline, send message to the client
			// res.render("home");
		});

		//Route for getting all Headlines from the db
		db.Headline.find({})
		.then(function(dbHeadline) {
			console.log(dbHeadline)
			var hbObject = { Headline: dbHeadline };
			res.render("home", hbObject);
			// res.json(dbHeadline);
		})
		.catch(function(err) {
			//If error occurred, send to client
			res.json(err);
		});	

	});

	// //Route for grabbing saved headlines from the DB
	// app.get("/saved", function(req, res) {
	// 	db.Headline.find({saved:true})
	// 	.then(function(dbHeadline) {
	// 		res.json(dbHeadline);
	// 	})
	// 	.catch(function(err) {
	// 		res.json(err);
	// 	});
	// 	res.render("saved");
	// });

	//Route for grabbing a specific headline by id, populate it with a note
	app.get("/headlines/:id", function(req, res) {
		db.Headline.findOne({_id:req.params.id})
		.populate("note")
		.then(function(dbHeadline) {
			res.json(dbHeadline);
		})
		.catch(function(err) {
			res.json(err);
		});
	});	

	// //Route for saving/updating a headline's associated Note
	app.post("/headlines/:id", function(req, res) {
		//create a new note and pass the req.body to the entry
		db.Note.create(req.body)
		.then(function(dbNote) {
		  // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
	      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
	      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
	      return db.Headline.findOneAndUpdate({_id: req.params.id}, {note:dbNote._id }, {new: true});
		})
		.then(function(dbHeadline) {
			res.json(dbHeadline);
		})
		.catch(function(err) {
			res.json(err);
		});
	});	
};



// //Whenever someone clicks the scrape button
// $(document).on("click", "#scrape", function() {
// 	$.getJSON("/scrape", function(data) {
// 		//For each one
// 		for (var i = 1; i < data.length; i++) {
// 			//Display the information on the page
// 			// $("#articles").prepend("<p><img src='" 
// 			// 	+ data[i].pic + "'></p><p class='title'>" 
// 			// 	+ data[i].title + "</p><a class='link' href='" + data[i].link + "'><p>www.eonline.com" 
// 			// 	+ data[i].link + "</p></a><button class='save-it'>Save Article</button><br/><br/>");
// 			console.log("scraping")




// 		}
// 	});
// });

// $(document).on("click", ".save-it", function() {
// 	$.getJSON("/", function(data) {
// 		//For each one
// 		for (var i = 0; i < data.length; i++) {
// 			//Display the information on the page
// 			$("#saved").append("<div></p><p><img src='" + data[i].pic + 
// 				"<p class='title'>" + data[i].title + 
// 				"</p><p class='link'>www.eonline.com" + data[i].link + 
// 				"</p><button class='add-note'>Save Article</button><br/><br/>");
// 		}
// 	});
// });




// var express = require("express");
// //Initialize Express
// var router = express.Router();

// module.exports = function() {
// // //A GET route for scraping the E! News Website
// router.get("/", function(req, res) {
// 	res.render("home");
// });

// }

// router.get("/headlines", function(req, res) {
// 	res.render("home");
// });

// app.get("/saved", function(req,res) {
// 	res.render("saved");
// });
