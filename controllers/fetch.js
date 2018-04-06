//Require models
const db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongojs = require("mongojs");

//Require scraping tools
const request = require("request");
const cheerio = require("cheerio");

//Routes
module.exports = function(app) {
	app.get("/scrape", function(req,res) {
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
			res.json(response);
		});
	});
}