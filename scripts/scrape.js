// //Require all models
// var db = require("../models");

// var request = require("request");
// var cheerio = require("cheerio");
// // var express = require("express");

// var scrape = function() {

// 	return request("http://www.eonline.com/news", function(error, response, html) {
// 		var $ = cheerio.load(html);
// 		var articles = [];

// 		$("h3").each(function(i, element) {
// 			var result = {};
// 			result.title = $(this).children(".articleTitle").text();
// 			result.link = $(this).children(".articleTitle").attr("href");

// 			articles.push(result);
// 		});

// 		return articles;

// 	});

// };

// module.exports = scrape;