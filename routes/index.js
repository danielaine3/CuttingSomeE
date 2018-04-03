var express = require("express");
//Initialize Express
var app = express();

//A GET route for scraping the E! News Website
app.get("/", function(req, res) {
	res.render("home");
});

app.get("/headlines", function(req, res) {
	res.render("home");
});

app.get("/saved", function(req,res) {
	res.render("saved");
});

module.exports = app;