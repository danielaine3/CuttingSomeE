// //Require all models
// var db = require("../models");

// var request = require("request");
// var cheerio = require("cheerio");

// module.exports = function(app) {
// 		//A GET route for scraping the E! News Website
// 	app.get("/", function(req, res) {
// 		//First, we grab the body of the html with request
// 		request("http://www.eonline.com/news", function(error, response, html) {
// 			//Then, we load that into cheerio and save it to $ for a shorthand select
// 			var $ = cheerio.load(html);
			
// 			//Now we grab every story-card tag, and do the following: 
// 			$("h3").each(function(i, element) {
// 				//Save an empty result object
// 				var result = {};

// 				//Add the text, href and img of every link, and save them as properties of the result object
// 				result.title = $(this).children(".articleTitle").text();
// 				result.link = $(this).children(".articleTitle").attr("href");
// 				// result.pic = $(".thumbnail")
// 				// 	.children("img")
// 				// 	.attr("src");

// 				//Create a new Headline using the 'result' object built from scraping
// 				db.Headline.create(result)
// 				.then(function(dbHeadline) {
// 					//view the added result in the console
// 					console.log(dbHeadline);
// 				})
// 				.catch(function(err) {
// 					//If error occurred, send to client
// 					// return res.json(err);
// 					console.log(err.message);
// 				});
// 			});
// 			//If scrape successful, save an Headline, send message to the client
// 			// res.render("home");
// 		});

// 		db.Headline.find({})
// 			.then(function(dbHeadline) {
// 				console.log(dbHeadline)
// 				var hbObject = {Headline: dbHeadline};
// 				res.render ("home", hbObject);
// 			})
// 			.catch(function(err) {
// 				//If error occurred, send to client
// 				res.json(err);
// 			});	
// 	})
// }



















// var express = require("express");

// // //Initialize Express
// // var router = express.Router();
// module.exports = function(app) {
// 	//A GET route for scraping the E! News Website
// 	app.get("/headlines", function(req, res) {
// 		//First, we grab the body of the html with request
// 		request("http://www.eonline.com/news", function(error, response, html) {
// 			//Then, we load that into cheerio and save it to $ for a shorthand select
// 			var $ = cheerio.load(html);
			
// 			//Now we grab every story-card tag, and do the following: 
// 			$("h3").each(function(i, element) {
// 				//Save an empty result object
// 				var result = {};

// 				//Add the text, href and img of every link, and save them as properties of the result object
// 				result.title = $(this).children(".articleTitle").text();
// 				result.link = $(this).children(".articleTitle").attr("href");
// 				// result.pic = $(".thumbnail")
// 				// 	.children("img")
// 				// 	.attr("src");

// 				//Create a new Headline using the 'result' object built from scraping
// 				db.Headline.create(result)
// 				.then(function(dbHeadline) {
// 					//view the added result in the console
// 					console.log(dbHeadline);
// 				})
// 				.catch(function(err) {
// 					//If error occurred, send to client
// 					// return res.json(err);
// 					console.log(err.message);
// 				});
// 			});
// 			//If scrape successful, save an Headline, send message to the client
// 			// res.render("home");
// 		});

// 		db.Headline.find({})
// 			.then(function(dbHeadline) {
// 				console.log(dbHeadline)
// 				var hbObject = {Headline: dbHeadline};
// 				res.render ("home", hbObject);
// 			})
// 			.catch(function(err) {
// 				//If error occurred, send to client
// 				res.json(err);
// 			});
// 	});
// };







// var express = require("express");
// //Initialize Express
// var app = express();

// //A GET route for scraping the E! News Website
// app.get("/", function(req, res) {
	
// 	res.render("home");
// });

// app.get("/headlines", function(req, res) {
// 	res.render("home");
// });

// app.get("/saved", function(req,res) {
// 	res.render("saved");
// });

// module.exports = app;




