//Import models
var db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongojs = require("mongojs");

module.exports = function(app) {
	//Routes
	//Display home.handlebars file
	app.get("/", function(req, res) {
		db.Headline.find({saved: false}, function(error, headlines) {
			//log errors
			if(error) {
				console.log(error);
			}else {
				res.render("home", {
					headline: headlines
				});
			}
		});
	});
	//Display saved.handlebars
	app.get("/saved", function(req, res) {
		db.Headline.find({saved: true}, function(error, saved) {
			//log errors
			if(error) {
				console.log(error);
			}else {
				res.render("saved", {
					headline: saved
				});
			}
		});
	});
	//Get all
	app.get("/all", function(req, res) {
		db.Headline.find({}, function(error, all) {
			//log errors
			if(error) {
				console.log(error);
			}else {
				res.json(all);
			}
		});
	});
	//Save headline
	app.put("/saveheadline/:id", function(req,res) {
		updateSave(true, req, res);
	});

	//Unsave headline
	app.put("/unsaveheadline/:id", function(req, res) {
		updateSave(false, req, res);
	});

	//Save/unsave function
	function updateSave(saved, req, res) {
		db.Headlines.findOneAndUpdate({ _id: req.params.id }, { saved: saved}, 
			function(err, data) {
				if(err) {
					console.log(err);
				}else {
					res.json(data);
				}
			});
	}
	//Delete article
	app.delete("/headlines/:id", function(req, res) {
		db.Headline.deleteOne({ _id: req.params.id },
			function(err, data) {
				if(err) {
					console.log(err);
				}else {
					res.json(data);
				}
			});
	});
}