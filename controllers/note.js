//Import models
var db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongojs = require("mongojs");

module.exports = function(app) {
	//Route for grabbing a specific Headline by id, populate with note
	app.get("/headlines/:id", function(req, res) {
		db.Headlines.findOne({ _id: req.params.id})
		//populate all notes associated with it
		.populate("note")
		.then(function(dbHeadline) {
			//if successful
			res.json(dbHeadline);
		})
		.catch(function(err) {
			//if error
			res.json(err);
		});
	});
	//Route for getting/finding all notes in database associated with particulate headline
	app.get("/notes/:id", function(req, res) {
		if(req.params.id) {
			db.Note.find({
				"headline": req.params.id
			})
			.exec(function(err, text) {
				if(err) {
					console.log(err)
				}else {
					res.send(text);
				}
			});
		}
	});
	//Create new note
	app.post("/notes", function(req, res) {
		if(req.body) {
			db.Note.create(req.body)
			.then(function(dbNote) {
				//if successful
				res.json(dbNote);
			})
			.catch(function(err) {
				//if error
				res.json(err);
			});
		}
	});
	//Find and update note
	app.get("/notepopulate", function(req, res) {
		Note.find({
			"id": req.params.id
		}, function(err, text) {
			if(err) {
				console.log(err);
			}else {
				res.send(text;)
			}
		});
	});
	//Delete note
	app.delete("/notes/:id", function(req, res) {
		db.Note.deleteOne({ _id: req.params.id }, function(err, data) {
			if(err) {
				console.log(err);
			}else {
				res.json(data);
			}
		});
	});
}