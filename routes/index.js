var request = require("request");
var cheerio = require("cheerio");
var express = require("express");

//Initialize Express
var app = express();

//Require all models
var db = require("../models");

//A GET route for scraping the BuzzFeed News Website
app.get("/", function(req, res) {
	//First, we grab the body of the html with request
	request("http://www.eonline.com/news", function(error, response, html) {
		//Then, we load that into cheerio and save it to $ for a shorthand select
		var $ = cheerio.load(html);

		//Now we grab every story-card tag, and do the following: 
		$("h3").each(function(i, element) {
			//Save an empty result object
			var result = {};

			//Add the text and href of every link, and save them as properties of the result object
			result.title = $(this)
				.children(".articleTitle")
				.text();
			result.link = $(this)
				.children("a.articleTitle")
				.attr("href");
			//Create a new Headline using the 'result' object built from scraping
			db.Headline.create(result)
			.then(function(dbHeadline) {
				//view the added result in the console
				console.log(dbHeadline);
			})
			.catch(function(err) {
				//If an error occured, send it to the client
				return res.json(err);
			});
		});
		//If scrape successful, save an Headline, send message to the client
		res.send("Scrape Complete");
	});

});

module.exports = app;